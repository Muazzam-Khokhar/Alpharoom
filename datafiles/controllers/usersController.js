import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';
import bcrypt from 'bcrypt';

const saltRound = 10;


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error("email already registered")
    } else {
        const user = await User.create({
            name,
            email,
            password,
        })
        res.send("User Register Successfully!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password })
        if (user) {
            const tempUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
            res.send(tempUser)
        }
        else {
            return res.status(400).json({ message: 'Login Failed' })
        }
    }
    catch (error) {
        return res.status(400).json({ error })
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).json(error)
    }
})

export { authUser, registerUser, getAllUsers }