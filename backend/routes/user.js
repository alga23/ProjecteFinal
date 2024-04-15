const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const Auth = require('../middleware/auth');

// Rutas para el Usuario
router.post('/registro', UserController.register);
router.post('/login', UserController.login);

//Exportar todas las rutas
module.exports = router;