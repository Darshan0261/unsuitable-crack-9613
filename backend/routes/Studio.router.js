const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { authentication } = require('../middlewares/authentication.middleware')
const { studioAuth, userAuth } = require('../middlewares/authorization.middleware')
const { studioIdValidator } = require('../middlewares/studioIdValidator')
const { bookingDayValidator, bookingTimeValidator, bookingSlotValidator } = require('../middlewares/bookingValidator')

const { StudioModel } = require('../models/Studio.model');
const { AppointmentModel } = require('../models/Appoinment.model')
const { default: mongoose } = require('mongoose');
const { BlacklistModel } = require('../models/Blacklist.model');

const studioRouter = express.Router();

// Get all studios
studioRouter.get('/', async (req, res) => {
    const { city, sort } = req.query;
    console.log(sort)
    try {
        if (sort) {
            if (city) {
                const studios = await StudioModel.aggregate([{ $project: { pass: 0, role: 0 } }, { $match: { city: city } }, { $sort: { price: +sort } }]);
                return res.send(studios)
            }
            const studios = await StudioModel.aggregate([{ $project: { pass: 0, role: 0 } }, { $sort: { price: +sort } }]);
            return res.send(studios)
        }
        if (city) {
            const studios = await StudioModel.aggregate([{ $project: { pass: 0, role: 0 } }, { $match: { city: city } }]);
            return res.send(studios)
        }
        const studios = await StudioModel.aggregate([{ $project: { pass: 0, role: 0 } }]);
        return res.send(studios)
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
                const blacklist = new BlacklistModel({ studio_id: user._id })
                await blacklist.save()
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

// Studio Logout
studioRouter.post('/logout', authentication, studioAuth, async (req, res) => {
    let { token } = req.body;
    const studio_id = token.id;
    token = req.headers.authorization;
    try {
        const blacklist = await BlacklistModel.findOne({ studio_id });
        blacklist.tokens.push(token);
        await blacklist.save();
        return res.send({ message: 'Logout Successfull' })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

studioRouter.patch('/update/:id', authentication, studioAuth, async (req, res) => {
    const { token } = req.body;
    const studio_id = req.params['id'];
    if (token.id != studio_id) {
        return res.status(401).send({ message: 'Access Denied' });
    }
    const payload = req.body;
    if (payload.password) {
        return res.status(400).send({ message: 'Bad Request - Wrong Request' });
    }
    try {
        await StudioModel.findOneAndUpdate({ _id: studio_id }, payload);
        return res.send({ message: 'Profile Updated Sucessfully' })
    } catch (error) {
        return res.status(501).send({message: error.message})
    }
})

studioRouter.patch('/update/password/:id', authentication, studioAuth, async (req, res) => {
    const { token } = req.body;
    const studio_id = req.params['id'];
    if (token.id != studio_id) {
        return res.status(401).send({ message: 'Access Denied' });
    }
    const { old_password, new_password } = req.body;
    if (!old_password || !new_password) {
        return res.status(428).send({ message: 'Password Required' })
    }
    try {
        const user = await StudioModel.findOne({ _id: studio_id });
        bcrypt.compare(old_password, user.password, function (err, result) {
            if (err) {
                return res.status(501).send({ message: err.message });
            }
            if (!result) {
                return res.status(403).send({ message: "Password does not match" })
            }
            bcrypt.hash(new_password, +process.env.saltRounds, async function (err, hashedPass) {
                if (err) {
                    return res.status(501).send({ message: err.message });
                }
                try {
                    await StudioModel.findOneAndUpdate({ _id: studio_id }, { password: hashedPass });
                    return res.send({ message: 'Password Changed Sucessfully' })
                } catch (error) {
                    return res.status(501).send({ message: error.message });
                }
            });
        });
    } catch (error) {
        return res.status(501).send({ message: error.message });
    }
})

// Get slots booked for date
studioRouter.post('/slots/:id', studioIdValidator, bookingDayValidator, async (req, res) => {
    const { date } = req.body;
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    const _id = new ObjectId(id)
    try {
        const appointments = await AppointmentModel.aggregate([{ $match: { studio_id: _id, date: date, status: 'Accepted' } }, { $project: { start_time: 1, end_time: 1, _id: 0 } }]);
        return res.send(appointments)
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

// Book slot body = date, start_time, end_time, params = id : studio_id
studioRouter.post('/slots/book/:id', authentication, userAuth, studioIdValidator, bookingDayValidator, bookingTimeValidator, bookingSlotValidator, async (req, res) => {
    const { studio, date, start_time, end_time, bill, token } = req.body;
    try {
        const appointment = new AppointmentModel({ date, bill, start_time, end_time, studio_id: studio._id, user_id: token.id });
        await appointment.save();
        return res.send({ message: 'Appointment Request Sent' });
    } catch (error) {
        return res.send({ message: error.message })
    }
})

module.exports = {
    studioRouter
}