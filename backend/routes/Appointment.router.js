const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { userAuth, studioAuth } = require('../middlewares/authorization.middleware');
const { AppointmentModel } = require('../models/Appoinment.model');

const appointmentRouter = express.Router();


// Get all appointments
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

// Accept Appointment
appointmentRouter.patch('/accept/:id', authentication, studioAuth, async (req, res) => {
    const { token, status } = req.body;
    const studio_id = token.id;
    const id = req.params['id'];
    if (!status) {
        return res.status(428).send({ message: 'Status is required' })
    }
    try {

        const appointment = await AppointmentModel.findOne({ _id: id, studio_id });

        let start_time = appointment.start_time.split(':').map(Number);
        start_time = start_time[0] * 100 + start_time[1];
        let end_time = appointment.end_time.split(':').map(Number);
        end_time = end_time[0] * 100 + end_time[1];

        const appointments = await AppointmentModel.find({ studio_id, date: appointment.date, status: 'Accepted' })

        let flag = true;

        appointments.forEach(appointment => {
            let app_start_time = appointment.start_time.split(':').map(Number);
            app_start_time = app_start_time[0] * 100 + app_start_time[1];
            let app_end_time = appointment.end_time.split(':').map(Number);
            app_end_time = app_end_time[0] * 100 + app_end_time[1];
            if (app_start_time <= start_time && app_end_time >= end_time) {
                flag = false;
            }
        })
        if (flag) {
            await AppointmentModel.findOneAndUpdate({ _id: id, studio_id }, { status })
            return res.send({ message: 'Appointment Accepted' });
        } else {
            return res.status(404).send({ message: 'Appointment Slot Already Booked' })
        }

    } catch (error) {
        res.status(501).send({ message: error.message });
    }
})


// Reject or cancel appointment
appointmentRouter.patch('/reject/:id', authentication, async (req, res) => {
    const { token } = req.body;
    
    const { id } = req.params;
    const role = token.role;
   
    if (role == 'studio') {
        const studio_id = token.id;
        const appointment = await AppointmentModel.findOne({ _id: id, studio_id });
        if (appointment) {
            await AppointmentModel.findOneAndUpdate({ _id: id }, { status: 'Rejected' })
             res.send({ message: 'Appointment Rejected' })
             return
        } else {
           res.status(401).send({ message: 'Access Denied' })
           return
        }
    } else {
        const user_id = token.id;
        console.log(user_id)
        const appointment = await AppointmentModel.findOne({ _id: id, user_id });
      console.log(appointment)
        if (appointment) {
            await AppointmentModel.findOneAndUpdate({ _id: id }, { status: 'Cancelled' })
            res.send({ message: 'Appointment Cancelled' })
            return
        } else {
            res.status(401).send({ message: 'Access Denied' })
            return
        }
    }
})

module.exports = {
    appointmentRouter
}