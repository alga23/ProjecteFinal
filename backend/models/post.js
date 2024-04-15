const { Schema, model } = require('mongoose');

const postSchema = Schema({
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    file: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    posts_parents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    posts_responses: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],

    likes_users_id: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    {
        timestamps: true,
    }
);

module.exports = model('Post', postSchema, 'posts');