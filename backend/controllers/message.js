// controllers/messageController.js
const Message = require('../models/message');
const User = require('../models/user');

const lastMessages = async (req, res) => {
    const userId = req.user.id;

    try {
        // Encontrar todos los mensajes donde el usuario es el emisor o receptor
        const messages = await Message.find({
            $or: [
                { usuarioEmisor: userId },
                { usuarioReceptor: userId }
            ]
        })
        .sort({ created_at: -1 })
        .populate('usuarioEmisor', '_id')
        .populate('usuarioReceptor', 'nick username imagen');

        // Creamos un mapa para almacenar el último mensaje de cada chat
        const lastMessagesMap = new Map();

        messages.forEach(message => {
            let chatUserId;
            // Determinar el ID del otro usuario en el chat
            if (message.usuarioEmisor._id.toString() === userId) {
                chatUserId = message.usuarioReceptor._id.toString();
            } else {
                chatUserId = message.usuarioEmisor._id.toString();
            }

            // Agregar o actualizar el último mensaje del chat en el mapa
            if (!lastMessagesMap.has(chatUserId)) {
                lastMessagesMap.set(chatUserId, message);
            } else {
                const existingMessage = lastMessagesMap.get(chatUserId);
                // Si el mensaje actual es más reciente, lo reemplazamos en el mapa
                if (message.created_at > existingMessage.created_at) {
                    lastMessagesMap.set(chatUserId, message);
                }
            }
        });

        // Convertir el mapa en un array de los últimos mensajes
        const lastMessages = Array.from(lastMessagesMap.values());

        res.status(200).json({ status: 'success', lastMessages });
    } catch (error) {
        console.error('Error fetching last messages:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching last messages' });
    }
};

const deleteChat = async (req, res) => {
    const { userId1, userId2 } = req.params;

    try {
        // Eliminar todos los mensajes entre userId1 y userId2
        await Message.deleteMany({
            $or: [
                { usuarioEmisor: userId1, usuarioReceptor: userId2 },
                { usuarioEmisor: userId2, usuarioReceptor: userId1 }
            ]
        });

        res.status(200).json({ status: 'success', message: 'Chat and messages deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat and messages:', error);
        res.status(500).json({ status: 'error', message: 'Error deleting chat and messages' });
    }
};

module.exports = {
    lastMessages,
    deleteChat
};
