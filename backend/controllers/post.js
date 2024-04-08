const Post = require('../models/post');
const User = require('../models/user')
const pagination = require('mongoose-pagination');
const path = require('path');
const fs = require('fs');

const createPost = async (req, res) => {
    //Check for content
    try {
        if (!req.body.content) {
            return res.status(400).send("No content found.")
        }
        const user = req.user

        const post = new Post({
            content: req.body.content,
            user_id: user.id, //user from the authMiddleware
        })
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: "Error en el servidor: " + error
        })
    }
}

// Listar todas las publicación de ese usuario
const user = async (req, res) => {

    try {

        const userId = req.params.id;

        let page = 1;
        if (req.params.page) page = req.params.page;

        const itemsPerPage = 3;

        const publications = await Post.find({ user_id: userId })
            .sort('-createdAt')
            .populate('user_id', '-password -__v -email')
            .paginate(page, itemsPerPage);

        if (!publications) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicaciones de ese usuario"
            })
        }

        const total = await Post.countDocuments();

        return res.status(200).send({
            status: "success",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            publications
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al listar las publicaciones de ese usuario"
        })
    }
}

// Subir una imagen a una publicación
const upload = async (req, res) => {
    try {

        let publicationId = req.params.id;

        if (!req.file) {
            return res.status(404).send({
                status: "error",
                message: "Petición no incluye una imagen"
            })
        }

        const imagen = req.file.originalname;
        const extension = path.extname(imagen);

        const extensiones = ['.png', '.jpg', '.jpeg'];

        if (!extensiones.includes(extension)) {

            const filePath = req.file.path;
            fs.unlinkSync(filePath);

            return res.status(404).send({
                status: "error",
                message: "Esa extension no es valida"
            })

        }

        const publicationUpdated = await Post.findByIdAndUpdate({ "user_id": req.user.id, "_id": publicationId }, { file: req.file.filename }, { new: true });

        if (!publicationUpdated) {
            return res.status(404).send({
                status: "error",
                message: "No se ha podido encontrar esa publicación para añadir una imagen"
            })
        }

        return res.status(200).send({
            status: "success",
            publicationUpdated,
            file: req.file
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al actualizar una imagen de un post"
        })
    }
}

//Like posts or remove like from already liked posts
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).select()
        if (!post) {
            return res.status(404).send("Post no encontrado");
        }
        //Check if the post is not already liked by the user
        let message = ""
        if (!post.likes_users_id.includes(req.user.id)) {
            post.likes++
            post.likes_users_id.push(req.user.id)
            message = "Like añadido al post"
        } else {
            post.likes--
            post.likes_users_id = post.likes_users_id.filter(id => id.toString() !== req.user.id.toString());
            message = "Like borrado del post"
        }
        await post.save()
        res.status(201).json({
            message: message,
            post: post,
            user: req.user.id
        })
    } catch (error) {
        console.error("Error añadiendo/borrando like: ", error)
        res.status(500).send("Error interno del servidor. " + error)
    }
}

module.exports = {
    createPost,
    user,
    upload,
    likePost
}