const { Schema, model, Types} = require('mongoose');

const MessageSchema = Schema({

    usuarioEmisor: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    usuarioReceptor: {
        type: Types.ObjectId,
        ref: 'User',
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