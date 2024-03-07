const moment = require('moment');
const jsonwebtoken = require('jsonwebtoken');

// Obtener la clave para generar un token de authentificación
const key = process.env.JWT_PRIVATE_KEY

const Auth = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).send({
            status: "error",
            message: "No se ha pasado la cabecera de authentificación"
        })
    }

    // Recuperar el token
    let token = req.headers.authorization.replace(/['"]+/g, '');
    try {

        // Decodificar token gracias a la clave con la que lo codifico
        let payload = jsonwebtoken.decode(token, key);
 
        // Verificar si se ha expirado el token
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                message: "Toxen expirado"
            })
        }

        // Devolver el token del usuario
        req.user = payload;

    }catch(error) {
        res.status(500).send({
            sttus: "error",
            message: "Error en el servidor, ", error
        })
    }

    next();
}

module.exports = Auth;