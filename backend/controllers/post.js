const Post = require('../models/post');
const User = require('../models/user')

const createPost = async (req, res) => {
    //Check for content
    if (!req.body.content) {
        return res.status(400).send("No content found.")
    }
    const user = req.user

    const post = new Post({
        content: req.body.content,
        user_id: user.id, //user from the authMiddleware
    })
    user.posts_id.push(post.id)

    await post.save();
    await user.save();
    res.status(201).json(post);
}

module.exports = {
    createPost,
}