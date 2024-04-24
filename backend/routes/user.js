const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

// Rutas para el Usuario
router.post('/registro', UserController.register);
router.post('/login', UserController.login);
router.get('/profile/:userId', UserController.viewUserProfile);
router.get('/devolverUsuarioToken', auth, UserController.retrieveOwnUser);

//Exportar todas las rutas
module.exports = router;