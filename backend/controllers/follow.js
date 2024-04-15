const Follow = require('../models/follow');

// Guardar y eliminar un Follow
const save = async (req, res) => {

    console.log("guardaar");
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

const following = async (req, res) => {

    try {

    } catch(error) {
        console.log(error);
    }
}

const follower = async (req, res) => {

    try {

    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    save,
    follower,
    following
}