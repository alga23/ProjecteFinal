const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();

// Rutas para el post
router.post("/create", auth, postController.createPost)

//Exportar todas las rutas
module.exports = router;