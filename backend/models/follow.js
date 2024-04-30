const { Schema, model } = require('mongoose');

const FollowSchema = Schema({

    user: {
        type: Schema.ObjectId,
        ref: "User"
    },
    follower: {
        type: Schema.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Follow', FollowSchema, 'follow');