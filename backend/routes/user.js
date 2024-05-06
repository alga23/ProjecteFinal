const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');

// Rutas para el Usuario
router.post('/registro', UserController.register);
router.post('/login', UserController.login);
router.get('/profile/:userId', UserController.viewUserProfile);
router.delete('/delete/:userId', UserController.deleteUser);
router.put('/editUser/', auth, UserController.editUser);



//Exportar todas las rutas
module.exports = router;