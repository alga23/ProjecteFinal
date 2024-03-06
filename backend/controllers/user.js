const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const Validators = require("../middleware/validators")
require('dotenv').config()

// Obtener la clave para generar un token de authentificación
const key = process.env.JWT_PRIVATE_KEY

const register = async (req, res) => {

    const body = req.body; // Recoger datos por el 
    try {
        // Verificar si los campos se han completado o no
        if (!body.nombreCompleto || !body.nick || !body.username || !body.email || !body.password) {
            return res.status(404).send({
                status: "error",
                error: "Faltan campos por completar"
            })
        }

        // Validación (no continua hasta que este todo correcto)
        Validators(body);
        // Verificar si el usuario que tenga username o email no este creado en la bbdd
        const existingUser = await User.findOne({
            $or: [
                {username: body.username.toLowerCase()},
                {email: body.email.toLowerCase()}
            ]
        })

        if (existingUser) {
            return res.status(404).send({ status: "error", error: "El username ya existe" })
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(body.password, 10)

        body.password = hashedPassword;
        // Crear un nuevo usuario
        const user = new User(body);

        // Guardar usuario en la bbdd
        await user.save()
        res.status(201).send({
            status: "success", 
            message: "Usuario creado con exito",
            user
        })

    } catch (error) {
        res.status(500).send("Error en el servidor:  " + error)
    }
}

const login = async (req, res) => {
    const body = req.body
    try {
        // Verificar que los campos no esten vacios
        if (!body.username || !body.password) {
            return res.status(400).send("Missing fields.")
        }
        // Pasar el username a minuscula
        const lowercaseUsername = body.username.toLowerCase()
        // Buscar el username 
        const user = await User.findOne({ username: { $regex: new RegExp(lowercaseUsername, 'i') }})

        if (!user) {    
            return res.status(400).send("El usuario no se encuentra")
        }
        // Comparar la contraseña que le estas pasando y la contraseña encriptada
        if (await bcrypt.compare(body.password, user.password)) {
            // Firma o se crea un token con esos datos
            const token = jwt.sign({ 
                id: user._id, 
                nick: user.nick,
                username: user.username,
                imagen: user.imagen
            }, key)

            res.status(200).send({
                user: {
                    id: user._id,
                    username: user.username,
                },
                token: token,
                message: "Has iniciado sesión correctamente",
            })
        } else {
            res.status(400).send("Contraseña incorrecta")
        }
    } catch (error) {
        res.status(500).send("Error en el servidor: " + error)
    }
}

module.exports = {
    register,
    login,
}