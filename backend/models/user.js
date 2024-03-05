const { Schema, model} = require('mongoose');

const UserSchema = Schema({

    nombreCompleto: {
        type: String,
        require: true
    },
    nick: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    biografia: {
        type: String,
    },
    imagen: {
        type: String,
        default: 'default.png'
    },
    rol: {
        type: String,
        enum: ['user','administrador']
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports= model('User', UserSchema, 'user');