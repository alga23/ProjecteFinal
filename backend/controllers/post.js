const Post = require('../models/post');
const User = require('../models/user')
const pagination = require('mongoose-pagination');
const path = require('path');
const fs = require('fs');
const followService = require('../services/followService');
const Follow = require('../models/follow');

const createPost = async (req, res) => {
    //Check for content
    try {
        if (!req.body.content) {
            return res.status(400).send("No hay texto para añadir")
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
const userPosts = async (req, res) => {

    try {
        
        // Obtener id del usuario
        const userId = req.params.id;

        let page = 1;
        if(req.params.page) page = req.params.page;

        const itemsPerPage = 10;

        // Obtener publicaciones de ese usuario
        const publications = await Post.find({user_id: userId})
                                        .sort('-createdAt')
                                        .populate('user_id', '-password -__v -email')
                                        .paginate(page, itemsPerPage);

        if(!publications) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicaciones de ese usuario"
            })
        }

        // COntar todos los Posts que tiene el usuario
        const total = await Post.countDocuments({user_id: userId});
 
        // Retornar publicacion y paginación
        return res.status(200).send({
            status: "success",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            publications
        })

    }catch(error) {

        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al listar las publicaciones de ese usuario"
        })
    }
}

// Subir una imagen a una publicación
const upload = async(req, res) => {
    try {

        // Obtener ip de publicacion
        let publicationId = req.params.id;

        if(!req.file) {
            return res.status(404).send({
                status: "error",
                message: "Petición no incluye una imagen"
            })
        }

        // Obtener nombre de archivo a enviar
        const imagen = req.file.originalname;
        // Extraer la extensión del archivo
        const extension = path.extname(imagen);

        const extensiones = ['.png', '.jpg', '.jpeg'];

        // Verificar que no envien un archivo con una extension invalida
        if (!extensiones.includes(extension)) {
            
            // Borrar archivo en caso de ser incorrecta
            const filePath = req.file.path;
            fs.unlinkSync(filePath);

            return res.status(404).send({
                status: "error",
                message: "Esa extension no es valida"
            })

        }

        // Actualizar publicación añadiendo el archivo enviado en el Post del usuario
        const publicationUpdated = await Post.findByIdAndUpdate({"user_id": req.user.id, "_id": publicationId}, {file: req.file.filename}, {new: true});

        if (!publicationUpdated ) {
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
        

    }catch(error) {
        
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al actualizar una imagen de un post"
        })
    }
}

// Listar publicación de los usuarios que sigues
const feedFollows = async (req, res) => {

    try {
        const userId = req.user.id;

        // Servicio para obtener un array de ids de usuarios que sigues y los que te siguen
        const follows = await followService.followindUserIds(userId);

        // Pagina actual
        let page = 1;
        if(req.params.page) page = req.params.page;

        const itemsPerPage = 10; // Items por pagina
        // Mostrar los posts de los usuarios que sigues y hacer paginación
        const posts = await Post.find({"user_id": {$in: follows.following}})
                                .sort('-createdAt')
                                .select({"likes_users_id": 0, "__v": 0})
                                .paginate(page, itemsPerPage);
        
        if(!posts) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicación de usuarios que sigues"
            })
        }
        // Contar los posts que hay de los usuarios que sigues
        const total = await Post.countDocuments({"user_id": {$in: follows.following}});
        return res.status(200).send({
            status: "success",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            posts,
            following: follows.following,
            follower: follows.follower,
        })

    }catch(error) {
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor: ", error
        })
    }
}

module.exports = {
    createPost,
    userPosts,
    upload,
    feedFollows
}