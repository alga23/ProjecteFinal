const Follow = require('../models/follow');

// Metodo para obtener todos los ids de usuarios seguidos y los que me siguen
const followindUserIds = async(identityUser) => {

    try {
        
        // Buscar todos los ids de usuarios que estoy siguiendo
        const following = await Follow.find({"user": identityUser}).select({"follower": 1, "_id": 0}).exec();

        // Buscar todos los ids de usuarios que me siguen
        const follower = await Follow.find({"follower": identityUser}).select({"user": 1, "_id": 0}).exec();

        const followingClean = [];

        // Almacenar esos ids de los que sigo en un array
        following.forEach(follow => {
            followingClean.push(follow.follower);
        })

        const followerClean = [];

        // Almacenar esos ids de los que me sigeun en un array
        follower.forEach(follow => {
            followerClean.push(follow.user);
        })

        return {
            following: followingClean,
            follower: followerClean
        }

    }catch(error) {
        
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor de Follows: ", error
        })
    }
}

module.exports = {
    followindUserIds
}