const { Schema, model } = require('mongoose');

const FollowSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Follow', FollowSchema, 'follow');