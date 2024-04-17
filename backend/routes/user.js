const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const Auth = require('../middleware/auth');

// Rutas para el Usuario
router.post('/registro', UserController.register);
router.post('/login', UserController.login);
router.get('/profile/:userId', UserController.viewUserProfile);

//Exportar todas las rutas
module.exports = router;