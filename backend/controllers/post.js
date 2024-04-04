const Post = require('../models/post');
const User = require('../models/user')

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

module.exports = {
    createPost,
}