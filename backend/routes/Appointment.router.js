const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { userAuth, studioAuth } = require('../middlewares/authorization.middleware');
const { AppointmentModel } = require('../models/Appoinment.model');
const { bookingRouter } = require('./Booking.router')

const appointmentRouter = express.Router();

appointmentRouter.use('/book', bookingRouter)

appointmentRouter.get('/', authentication, async (req, res) => {
    const { status } = req.query;
    const { token } = req.body;
    if (token.role == 'studio') {
        try {
            if (status) {
                const appointments = await AppointmentModel.find({ studio_id: token.id, status })
                return res.send(appointments)
            }
            const appointments = await AppointmentModel.find({ studio_id: token.id })
            return res.send(appointments)
        } catch (error) {
            res.status(501).send({ message: 'Something went wrong' })
        }
    } else {
        try {
            if (status) {
                const appointments = await AppointmentModel.find({ user_id: token.id, status })
                return res.send(appointments)
            }
            const appointments = await AppointmentModel.find({ user_id: token.id })
            return res.send(appointments)
        } catch (error) {
            res.status(501).send({ message: 'Something went wrong' })
        }
    }
})

appointmentRouter.patch('/update/status/:id', authentication, studioAuth, async (req, res) => {
    const { token, status } = req.body;
    const studio_id = token.id;
    const id = req.params['id'];
    try {
        await AppointmentModel.findOneAndUpdate({ _id: id, studio_id }, { status })
        res.send({ message: 'Appointment Status Updated Successfully' });
    } catch (error) {
        res.status(501).send({ message: error.message });
    }
})

module.exports = {
    appointmentRouter
}