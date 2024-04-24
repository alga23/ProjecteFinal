const Post = require('../models/post');
const User = require('../models/user')
const path = require('path');
const fs = require('fs');
const followService = require('../services/followService');
const mongoosePaginate = require('mongoose-pagination');
const cloudinary = require('../cloudinary');

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
        res.status(201).send({
            message: "Post creado correctamente",
            status: "success",
            post: post
        });
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
        if (req.params.page) page = req.params.page;

        const itemsPerPage = 10;

        // Obtener publicaciones de ese usuario
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

        // COntar todos los Posts que tiene el usuario
        const total = await Post.countDocuments({ user_id: userId });

        // Retornar publicacion y paginación
        return res.status(200).send({
            status: "success",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            publications
        })

    } catch (error) {

        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al listar las publicaciones de ese usuario"
        })
    }
}

// Subir una imagen a una publicación
const upload = async (req, res) => {
    try {

        // Obtener id de publicacion
        let publicationId = req.params.id;

        if (!req.file) {
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

        const imagenPost = await cloudinary.uploader.upload(req.file.path, {
                                                            folder: 'Post',
                                                            width: 200,
                                                            height: 200,
                                                            crop: "scale",
                                                            format: 'webp'
        });

        // Actualizar publicación añadiendo el archivo enviado en el Post del usuario
        const publicationUpdated = await Post.findByIdAndUpdate({ "user_id": req.user.id, "_id": publicationId }, { file: imagenPost.secure_url }, { new: true });

        if (!publicationUpdated) {
            return res.status(404).send({
                status: "error",
                message: "No se ha podido encontrar esa publicación para añadir una imagen"
            })
        }

        return res.status(200).send({
            status: "success",
            publicationUpdated
        })


    } catch (error) {
        console.log(error);
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

        console.log(follows);
        // Pagina actual
        let page = 1;
        if (req.params.page) page = req.params.page;

        const itemsPerPage = 3; // Items por pagina
        // Mostrar los posts de los usuarios que sigues y hacer paginación
        const posts = await Post.find({ "user_id": { $in: follows.following } })
            .sort('-createdAt')
            .select({ "__v": 0 })
            .paginate(page, itemsPerPage)
            .populate("user_id", "nick username imagen");

        if (!posts) {
            return res.status(404).send({
                status: "error",
                message: "No hay publicación de usuarios que sigues"
            })
        }
        // Contar los posts que hay de los usuarios que sigues
        const total = await Post.countDocuments({ "user_id": { $in: follows.following } });
        return res.status(200).send({
            status: "success",
            page,
            total,
            pages: Math.ceil(total / itemsPerPage),
            posts: posts,
            following: follows.following,
            follower: follows.follower,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor: ", error
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

//Fav a post with authenticated user
const favPost = async (req, res) => {
    try {
        // Verificar si el usuario está autenticado
        if (!req.user) {
            return res.status(401).send("Usuario no autenticado");
        }

        // Buscar el post por su ID
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(req.user.id);
        if (!post) {
            return res.status(404).send("Post no encontrado");
        }

        // Verificar si el post ya está en favoritos del usuario
        const alreadyFavorited = user.fav_posts_id.includes(post._id);
        let message = "";

        if (!alreadyFavorited) {
            // Si no está en favoritos, lo añadimos
            user.fav_posts_id.push(post._id);
            message = "Post añadido a favoritos";
        } else {
            // Si ya está en favoritos, lo eliminamos
            user.fav_posts_id = user.fav_posts_id.filter(favPostId => !favPostId.equals(post._id));
            message = "Post borrado de favoritos";
        }

        // Guardamos los cambios en el usuario
        await user.save();

        // Respondemos con el mensaje y la información del post y el usuario
        res.status(201).json({
            message: message,
            post: post,
            user: user.id
        });
    } catch (error) {
        console.error("Error añadiendo/borrando el post de favoritos: ", error);
        res.status(500).send("Error interno del servidor. " + error);
    }
}


//Method to get all posts faved by a user
const favPostsUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('fav_posts_id');
        if (!user) {
            return res.status(404).send("Usuario no encontrado");
        }
        res.status(200).json({
            message: "Posts favoritos del usuario",
            posts: user.fav_posts_id
        });
    } catch (error) {
        console.error("Error al obtener los posts favoritos del usuario: ", error);
        res.status(500).send("Error interno del servidor. " + error);
    }
}

const respondPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).select()
        if (!post) {
            return res.status(404).send("Post no encontrado")
        }
        const responsePost = new Post({
            content: req.body.content,
            user_id: user.id,
            posts_parents: [...post.posts_parents, post._id]
        })
        post.posts_responses.push(responsePost)
        await post.save()
        await responsePost.save()
        res.status(201).json({
            message: "Respuesta creada con éxito.",
            respondPost: respondPost
        })

    } catch (error) {
        console.error("Error al obtener el post: ", error);
        res.status(500).send("Error interno del servidor. " + error);
    }
}

const retrievePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId).select()
        if (!post) {
            console.log("No se ha encontrado el post")
            res.status(400).send("No se ha encontrado el post")
        }
        res.status(200).json({
            message: "Post encontrado",
            post: post
        })

    } catch (error) {
        console.log("There was an error: " + error)
        res.status(500).send("There was an error: " + error)
    }

}

//method to delete post
const deletePost = async (req, res) => {
    try {
        const publicationId = req.params.id;

        const publication = await Post.findOne({ "user_id": req.user.id, "_id": publicationId });

        if (!publication) {
            return res.status(404).send({
                status: "error",
                message: "No se ha podido encontrar ningun post que borrar"
            })
        }

        await publication.deleteOne({ "_id": publicationId });
        return res.status(200).send({
            status: "succes",
            message: "publicacion borrada"
        })
    }
    catch (e) {
        console.log(e);
    }
}



module.exports = {
    createPost,
    userPosts,
    upload,
    feedFollows,
    likePost,
    favPost,
    favPostsUser,
    respondPost,
    retrievePost,
    deletePost

}