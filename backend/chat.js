const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const dotenv = require('dotenv');
const Message = require('./models/message');
const cloudinary = require('./cloudinary');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

function connectChat() {

    const userSockets = {};

    io.on('connection', socket => {
        console.log('Usuario conectado: ', socket.id);

        socket.on('register', async (userId, id) => {
            Object.keys(userSockets).forEach(key => {
                if (userSockets[key] === socket.id) {
                    delete userSockets[key];
                }
            });

            userSockets[userId] = socket.id;
            console.log(`Usuario ${userId} registrado con socket ${socket.id}`);
            console.log(userSockets);
            try {
                const messages = await Message.find({
                    $or: [
                        { usuarioEmisor: userId, usuarioReceptor: id },
                        { usuarioEmisor: id, usuarioReceptor: userId }
                    ]
                }).sort({ created_at: 1 });

                socket.emit('loadMessages', messages);
            } catch (error) {
                console.log("Error al recuperar mensajes: ", error);
            }
        });

        socket.on('message', async ({ usuarioReceptor, usuarioEmisor, contenido, imagen }) => {
            const recipientSocketId = userSockets[usuarioReceptor];
            let imagenUrl;

            console.log(usuarioReceptor);
            try {
                if (imagen) {
                    // Guardar la imagen temporalmente en el servidor
                    const imagePath = path.join(__dirname, 'temp', `${Date.now()}_image`);
                    fs.writeFileSync(imagePath, imagen);

                    const uploadedImagen = await cloudinary.uploader.upload(imagePath, {
                        folder: "chat_images",
                        width: 250,
                        height: 250,
                        crop: "scale",
                        format: "webp"
                    })
                    imagenUrl = uploadedImagen.secure_url;
                    console.log(imagenUrl);
                    fs.unlinkSync(imagePath);
                }

                const messageData = { usuarioEmisor, usuarioReceptor, imagenUrl };

                // Verificar si hay contenido antes de agregarlo al objeto messageData
                if (contenido) {
                    messageData.contenido = contenido;
                }

                console.log(messageData);
                const message = new Message(messageData);

                await message.save();
                console.log("Mensaje guardado");

            } catch (error) {
                console.log(error);
            }
            if (recipientSocketId) {
                io.to(recipientSocketId).emit('message', message);
                console.log(`Mensaje enviado de ${usuarioEmisor} a ${usuarioReceptor}`);
            } else {
                console.log(`No se encontró socket para el destinatario con ID: ${usuarioReceptor}`);
            }
        });

        socket.on('disconnect', () => {
            Object.keys(userSockets).forEach(userId => {
                if (userSockets[userId] === socket.id) {
                    delete userSockets[userId];
                    console.log(`Usuario ${userId} desconectado y eliminado`);
                }
            });
        });
    });

    const PORT = 3001 || process.env.PORT;

    server.listen(PORT, () => console.log(`Chat escuchando en el puerto: ${PORT}`));

}

module.exports = connectChat;