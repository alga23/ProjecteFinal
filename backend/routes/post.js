const express = require('express');
const auth = require('../middleware/auth')
const router = express.Router();
const postController = require('../controllers/post')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads/post/')
    },
    filename: (req, path, cb) => {
        cb(null, 'post-' + Date.now() + '-' + path.originalname)
    }
})

const uploads = multer({ storage });

// Rutas para el post
router.post("/create", auth, postController.createPost)
router.get('/user/:id/:page?', auth, postController.user)
router.post('/upload/:id', [auth, uploads.single('file0')], postController.upload);
router.put('/like/:postId', auth, postController.likePost)
router.post('/fav/:postId', auth, postController.favPost)
router.get('/fav/user', auth, postController.favPostsUser)
router.post('/respond/:postId', auth, postController.respondPost)
router.get('/:postId', auth, postController.retrievePost)



//Exportar todas las rutas
module.exports = router;