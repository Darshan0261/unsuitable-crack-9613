const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { UserModel } = require('../models/Users.model');
const { authentication } = require('../middlewares/authentication.middleware');
const { BlacklistModel } = require('../models/Blacklist.model');
const { userAuth } = require('../middlewares/authorization.middleware');

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
    const { name, mobile, password } = req.body;
    try {
        const userExist = await UserModel.findOne({ mobile });
        if (userExist) {
            return res.status(403).send({ message: 'User already registered' })
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hashedPass) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            try {
                const user = new UserModel({ name, password: hashedPass, mobile })
                await user.save();
                const blacklist = new BlacklistModel({ user_id: user._id })
                await blacklist.save()
                return res.send({ message: 'User signup sucessfull' })
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

userRouter.post('/login', async (req, res) => {
    const { mobile, password } = req.body;
    try {
        const user = await UserModel.findOne({ mobile });
        if (user == null) {
            return res.status(403).send({ message: 'User not registered' })
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            if (!result) {
                return res.status(401).send({ message: 'Wrong Credentials' });
            }
            const token = jwt.sign({ name: user.name, role: user.role, id: user._id }, process.env.KEY);
            res.send({ message: 'Login Sucessfull', token })
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

userRouter.post("/logout", authentication, userAuth, async (req, res) => {
    let { token } = req.body;
    const user_id = token.id;
    token = req.headers.authorization;
    try {
        const blacklist = await BlacklistModel.findOne({ user_id });
        blacklist.tokens.push(token);
        await blacklist.save();
        return res.send({ message: 'Logout Successfull' })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

module.exports = {
    userRouter
}