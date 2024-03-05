const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require("jsonwebtoken")
require('dotenv').config()

const key = process.env.JWT_PRIVATE_KEY

const register = async (req, res) => {
    try {
        // Verify the required fields are not empty
        if (!req.body.username || !req.body.password || !req.body.email || !req.body.alias) {
            return res.status(400).json({ error: "Missing required fields." })
        }
        // Verify if there is a user with that username already, using lower case
        const lowercaseUsername = req.body.username.toLowerCase()
        const existingUser = await User.findOne({ username: { $regex: new RegExp(lowercaseUsername, 'i') } })
        if (existingUser) {
            return res.status(400).json({ error: "That username is already in use." })
        }
        //Verify if there is a user with that email already, using lower case
        const lowercaseEmail = req.body.email.toLowerCase()
        const existingEmail = await User.findOne({ email: lowercaseEmail })
        if (existingEmail) {
            return res.status(400).json({ error: "That email is already in use." })
        }
        // Validate the username
        if (!(await validName(req.body.username))) {
            return res.status(400).json({ error: "Not a valid name." })
        }
        //Validate the email
        if (!(await validEmail(req.body.email))) {
            return res.status(400).json({ error: "Not a valid email." })
        }
        // Validate the password
        if (!(await validPassword(req.body.password))) {
            return res.status(400).json({ error: "Not a valid password." })
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        //Check for description lenght
        if (req.body.description && req.body.description.length > 50) {
            return res.status(400).json({ error: "The description is too long." })
        }
        //Verify the alias is valid
        if (!(await validAlias(req.body.alias))) {
            return res.status(400).json({ error: "Not a valid alias." })
        }
        // Create a new user
        const user = new User({
            email: lowercaseEmail,
            username: req.body.username,
            password: hashedPassword,
            alias: req.body.alias,
            description: req.body.description,
        })
        // Save the user to the DB
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error occurred: " + error)
    }
}

const login = async (req, res) => {
    const body = req.body
    try {
        // Verify the fields are not empty
        if (!body.username || !body.password) {
            return res.status(400).send("Missing fields.")
        }
        //Request from the user to lower case
        const lowercaseUsername = body.username.toLowerCase()
        //DB query to look only for lowercase
        const user = await User.findOne({ username: { $regex: new RegExp(lowercaseUsername, 'i') } })
        //const user = await User.findOne({ username: body.name })
        if (!user) {
            return res.status(400).send("The user was not found.")
        }
        if (await bcrypt.compare(body.password, user.password)) {
            console.log(user)
            const token = jwt.sign({ id: user._id, username: user.username }, key)
            res.status(200).json({
                user: {
                    id: user._id,
                    username: user.username,
                },
                token: token,
                message: "Login was successful.",
            })
        } else {
            res.status(400).send("Wrong password.")
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Error occurred: " + error)
    }
}

//Check password for at least 1 upper case and 1 lower case, 1 number, minimum 5 lenght maximum 40 and not spaces
const validPassword = async (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s).{5,40}$/
    return regex.test(password)
}

//Check the name for the user does't have spaces and is maximum 15 characters lenght
const validName = async (name) => {
    const regex = /^(?!.*\s).{1,15}$/
    return regex.test(name)
}

//Check the email is valid
const validEmail = async (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

//Check the alias doesn't onle have spaces and has characters
const validAlias = async (alias) => {
    const regex = /^(?!\s+$).{1,20}$/
    return regex.test(alias)
}

module.exports = {
    register,
    login,
    getUser: (id) => User.findById(id),
}