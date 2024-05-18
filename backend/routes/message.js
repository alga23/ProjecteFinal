const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const messageControllers = require('../controllers/message');

// Rutas para los mensajes
router.get('/last-messages', auth, messageControllers.lastMessages);

//Exportar todas las rutas
module.exports = router;