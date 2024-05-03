const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const followControllers = require('../controllers/follow');

// Rutas para los follows
router.post('/save', auth, followControllers.save);
router.get('/following/:id/:page?', auth, followControllers.following);
router.get('/followers/:id/:page?', auth, followControllers.followers);

//Exportar todas las rutas
module.exports = router;