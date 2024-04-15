const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const followControllers = require('../controllers/follow');

// Rutas para los follows
router.post('/save', auth, followControllers.save);
router.post('/following/:id', auth, followControllers.following);
router.post('/follower/:id', auth, followControllers.follower);


//Exportar todas las rutas
module.exports = router;