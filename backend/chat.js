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

        socket.on('register', async (userId, id) => {
            Object.keys(userSockets).forEach(key => {
                if (userSockets[key] === socket.id) {
                    delete userSockets[key];
                }
            });

            userSockets[userId] = socket.id;

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

                const message = new Message(messageData);

                await message.save();
 
                if (recipientSocketId) {
                    io.to(recipientSocketId).emit('message', message);
                } else {
                    console.log(`No se encontró socket para el destinatario con ID: ${usuarioReceptor}`);
                }
            } catch (error) {
                console.log(error);
            }
        });

        socket.on('deleteMessage', async(message) => {
            try {
                const deleteMessage = await Message.findByIdAndDelete(message._id);

                if (deleteMessage) {
                    const recipientSocketId = userSockets[deleteMessage.usuarioReceptor];
                    const senderSockerId = userSockets[deleteMessage.usuarioEmisor];

                    if (recipientSocketId) {
                        io.to(recipientSocketId).emit('messageDeleted', message._id);
                    }
                    if (senderSockerId) {
                        io.to(senderSockerId).emit('messageDeleted', message._id);
                    }
                }
            }catch(error) {
                console.log(error);
            }
        });

        socket.on('disconnect', () => {
            Object.keys(userSockets).forEach(userId => {
                if (userSockets[userId] === socket.id) {
                    delete userSockets[userId];
                }
            });
        });
    });

    const PORT = 3001 || process.env.PORT;

    server.listen(PORT, () => console.log(`Chat escuchando en el puerto: ${PORT}`));

}

module.exports = connectChat;