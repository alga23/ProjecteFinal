const jwt = require("jsonwebtoken")
const moment = require('moment');
const dotenv = require('dotenv');

dotenv.config();

// Obtener la clave para generar un token de authentificación
const key = process.env.JWT_PRIVATE_KEY

const generateToken = (user) => {

    const datos = {
        id: user._id, 
        nick: user.nick,
        username: user.username,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().add(90, "days").unix()
    }

    return jwt.sign(datos, key);
}   

module.exports = generateToken;