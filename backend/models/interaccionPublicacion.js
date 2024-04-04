const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    favoritos: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    numero_visualizacion: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    numero_compartido: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('InteraccionPublicacion', UserSchema, 'user');