const Follow = require('../models/follow');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-pagination');
const followService = require('../services/followService');

// Guardar y eliminar un Follow
const save = async (req, res) => {

    try {
        const user = req.user.id;

        const seguido = await Follow.findOne({user: user, follower: req.body.follower});

        if (!seguido) {
            const followStored = new Follow({
                user: user,
                follower: req.body.follower
            })
    
            const follow = await followStored.save();

            console.log(follow);
            return res.status(200).send({
                status: "success",
                message: "Le has seguido",
                user: follow.user,
                follower: follow.follower
            })

        } else {
            await Follow.findOneAndDelete({user: user, follower: req.body.follower});
            return res.status(200).send({
                status: "success",
                message: "Le has dejado de seguir"
            })
        }

    } catch(error) {
        
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor al guardar un follow, " + error,
        })
    }
}

// Accion listado de usuarios que cualquier usuario está siguiendo (siguiendo)
const following = async (req, res) => {

    try {
        // Sacar el id del usuario identificado
        let userId = req.user.id;
        // Comprobar si me llega el id por parametro en url
        if (req.params.id) userId = req.params.id;

        // Comprobar si me llega la pagina, si no la pagina 1
        let page = 1;
        if (req.params.page) page = req.params.page;

        // Usarios por pagina quiero mostrar
        const itemsPerPage = 50;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                status: "error",
                message: "El ID del usuario seguido no es valido"
            })
        }
        // Find a follow, popular datos de los usuarios y paginar con mongoose pagination
        const follows = await Follow.find({ user: userId })
                                    .populate("user follower", "-password -__v -email")
                                    .paginate(page, itemsPerPage);


        const total = await Follow.countDocuments();
        // Listado de usuarios de trinity, y soy jonathan,
        // Sacar un array de ids de los usuarios que me siguen y los que sigo como jonathan
        const followUserIds = await followService.followindUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que estoy siguiendo",
            follows,
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        })
    } catch (error) {
        console.log(error);
    }
}

// Acción listado de usuario que siguen a cualquier otro usuario (soy seguido, mis seguidores)
const followers = async (req, res) => {
    try {
        // Sacar el id del usuario identificado
        let userId = req.user.id;
        // Comprobar si me llega el id por parametro en url
        if (req.params.id) userId = req.params.id;

        // Comprobar si me llega la pagina, si no la pagina 1
        let page = 1;
        if (req.params.page) page = req.params.page;

        // Usarios por pagina quiero mostrar
        const itemsPerPage = 5;

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                status: "error",
                message: "El ID del usuario seguido no es valido"
            })
        }

         const follows = await Follow.find({ follower: userId })
         .populate("user", "-password -__v -email")
         .paginate(page, itemsPerPage);

         const total = await Follow.countDocuments();

        const followUserIds = await followService.followindUserIds(req.user.id);

        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que me siguen",
            follows,
            total: total,
            pages: Math.ceil(total/itemsPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        })

    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    save,
    following,
    followers
}