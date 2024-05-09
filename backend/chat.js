const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomsUsers } = require('./utils/users');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

function connectChat() {

    io.on('connection', socket => {
        console.log('Usuaio conectado: ', socket.id);

        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        })
        
    })

    const PORT = 3001 || process.env.PORT;

    server.listen(PORT, () => console.log(`Chat escuchando en el puerto: ${PORT}`));

}

module.exports = connectChat;