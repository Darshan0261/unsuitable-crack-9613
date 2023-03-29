const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { authentication } = require('../middlewares/authentication.middleware')
const { studioAuth, userAuth } = require('../middlewares/authorization.middleware')

const { StudioModel } = require('../models/Studio.model');
const { AppointmentModel } = require('../models/Appoinment.model')
const { default: mongoose } = require('mongoose');

const studioRouter = express.Router();

// Get all studios
studioRouter.get('/', async (req, res) => {
    try {
        const studios = await StudioModel.aggregate([{ $project: { pass: 0, role: 0 } }]);
        res.send(studios)
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

// Get specific studio
studioRouter.get('/:id', async (req, res) => {
    const id = req.params['id'];
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const _id = new ObjectId(id)
        const studio = await StudioModel.aggregate([{ $match: { _id } }, { $project: { pass: 0, role: 0 } }]);
        res.send(studio[0])
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

// Studio Register
studioRouter.post('/signup', async (req, res) => {
    const payload = req.body;
    const { mobile, password } = payload;
    try {
        const userExist = await StudioModel.findOne({ mobile });
        if (userExist) {
            return res.status(403).send({ message: 'Studio already registered' })
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hashedPass) {
            if (err) {
                return res.status(500).send({ message: err.message });
            }
            try {
                const user = new StudioModel({ pass: hashedPass, ...payload })
                await user.save();
                return res.send({ message: 'Studio Registered sucessfull' })
            } catch (error) {
                return res.status(500).send({ message: error.message });
            }
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

// Studio Login
studioRouter.post('/login', async (req, res) => {
    const { mobile, password } = req.body;
    try {
        const user = await StudioModel.findOne({ mobile });
        if (user == null) {
            return res.status(403).send({ message: 'Studio not registered' })
        }
        bcrypt.compare(password, user.pass, function (err, result) {
            if (err) {
                return res.status(500).send({ message: 'Something went wrong' });
            }
            if (!result) {
                return res.status(401).send({ message: 'Wrong Credentials' });
            }
            const token = jwt.sign({ name: user.name, role: user.role, id: user._id }, process.env.KEY);
            res.send({ message: 'Login Sucessfull', token })
        });
    } catch (error) {
        return res.status(500).send({ message: 'Something went wrong' });
    }
})

module.exports = {
    studioRouter
}