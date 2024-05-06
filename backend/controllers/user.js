const bcrypt = require("bcrypt")
const User = require('../models/user')
const Validators = require("../middleware/validators")
const generateToken = require("../services/jwt");

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
                { username: body.username.toLowerCase() },
                { email: body.email.toLowerCase() }
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
        if (!body.email || !body.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan campos"
            })
        }
        // Pasar el username a minuscula
        const lowercaseUsername = body.email.toLowerCase()
        // Buscar el username 
        const user = await User.findOne({ email: { $regex: new RegExp(lowercaseUsername, 'i') } })

        if (!user) {
            return res.status(400).send({
                status: "error",
                message: "El usuario no se encuentra"
            })

        }
        // Comparar la contraseña que le estas pasando y la contraseña encriptada
        if (await bcrypt.compare(body.password, user.password)) {
            // Firma o se crea un token con esos datos
            const token = generateToken(user);

            res.status(200).send({
                status: "success",
                user: {
                    id: user._id,
                    username: user.username,
                },
                token: token,
                message: "Has iniciado sesión correctamente",
            })
        } else {
            res.status(400).send({
                status: "error",
                message: "Contraseña incorrecta"
            })
        }
    } catch (error) {
        res.status(500).send("Error en el servidor: " + error)
    }
}

const viewUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await User.findById(userId).select("-nombreCompleto -password -email -__v")
        if (!user) {
            return res.status(404).send({
                status: 'error'
            })
        }

        res.status(200).send({
            status: "success",
            user: user
        })
    } catch (error) {
        console.error('Error buscando el usuario:', error)
        res.status(500).send({ error: 'Error interno del servidor' })
    }
}

//borrar usuario
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Verificar el ID del usuario a eliminar
        console.log('ID del usuario a eliminar:', userId);


        // Buscar el usuario que se quiere eliminar
        const user = await User.findById(userId);

        // Verificar si se encontró el usuario
        console.log('Usuario encontrado:', user);
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "No se ha podido encontrar el usuario que borrar"
            });
        }

        // Eliminar al usuario
        const result = await user.deleteOne({ "_id": userId });

        console.log('Resultado de la eliminación:', result); // Verificar el resultado de la eliminación

        if (result.deletedCount === 0) {
            return res.status(400).send({
                status: "error",
                message: "No se ha podido eliminar el usuario"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "Usuario borrado correctamente"
        });
    } catch (error) {
        console.error('Error al intentar eliminar el usuario:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}
//editar usuario
const editUser = async (req, res) => {
    const userIdentity = req.user.id;
    const userUpdate = req.body;

    
    try {
        
        Object.entries(userUpdate).forEach(([key, value]) => {
            if (value !== '') {
                userUpdate[key] = value;
            } else {
                delete userUpdate[key]; // Eliminar el campo si el valor está en blanco
            }
        });
          

        // Actualizar el usuario con los datos del body
        const updatedUser = await User.findOneAndUpdate(
            { _id: userIdentity }, userUpdate, { new: true } // Devuelve el documento actualizado
        );

        res.status(200).send({
            status: "success",
            message: "Usuario actualizado correctamente",
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al intentar actualizar el usuario:', error);
        res.status(500).send({ error: 'Error interno del servidor' });
    }
}


module.exports = {
    register,
    login,
    viewUserProfile,
    deleteUser,
    editUser
}