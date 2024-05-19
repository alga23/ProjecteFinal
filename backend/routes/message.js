const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const messageControllers = require('../controllers/message');

// Rutas para los mensajes
router.get('/last-messages', auth, messageControllers.lastMessages);
router.delete('/chat/:userId1/:userId2', auth, messageControllers.deleteChat);

//Exportar todas las rutas
module.exports = router;