const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads/perfil/')
    },
    filename: (req, path, cb) => {
        cb(null, 'user-' + Date.now() + '-' + path.originalname)
    }
})

const uploads = multer({ storage });


// Rutas para el Usuario
router.post('/registro', UserController.register);
router.post('/login', UserController.login);
router.get('/profile/:userId', UserController.viewUserProfile);
router.post('/upload', [auth, uploads.single('file0')], UserController.upload);
router.get('/devolverUsuarioToken', auth, UserController.retrieveOwnUser);

//Exportar todas las rutas
module.exports = router;