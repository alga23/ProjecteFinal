const { Schema, model} = require('mongoose');

const MessageSchema = Schema({

    usuarioEmisor: {
        type: String,
        required: true
    },
    usuarioReceptor: {
        type: String,
        required: true
    },
    contenido: {
        type: String
    },  
    imagenUrl: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Message', MessageSchema, 'message');