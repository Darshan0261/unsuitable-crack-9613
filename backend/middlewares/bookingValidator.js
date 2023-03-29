const { AppointmentModel } = require("../models/Appoinment.model");
const { StudioModel } = require("../models/Studio.model");


const studioIdValidator = async (req, res, next) => {
    const { date, start_time, end_time, bill, token } = req.body;
    const studio_id = req.params['id'];
    const user_id = token.id;
    try {

        // Check is studio exists or not
        const studio = await StudioModel.findOne({ _id: studio_id })
        if (studio == null) {
            return res.status(404).send({ message: 'Studio not found' });
        }
        req.body.studio = studio;
        next()
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
}

const bookingDayValidator = (req, res, next) => {
    let { date, start_time, end_time } = req.body;
    let bookingDay = date.getDay();
    const { studio } = req.body;
    // Check if booking slot is in studio working day
    if (studio.working_days.some(day => {
        day == bookingDay
    })) {
        next()
    } else {
        return res.status(404).send({ message: `Studio is closed on ${date}` })
    }
}

const bookingTimeValidator = (req, res, next) => {
    let { start_time, end_time } = req.body;
    const { studio } = req.body;
    start_time = start_time.split(':').map(Number);
    let bookingStartTime = start_time[0] * 60 * 60 + start_time[1] * 60 + start_time[2];
    end_time = end_time.split(':').map(Number);
    let bookingEndTime = end_time[0] * 60 * 60 + end_time[1] * 60 + end_time[2];
    let studioStartTime = studio.start_time.split(':').map(Number)
    studioStartTime = studioStartTime[0] * 60 * 60 + studioStartTime[1] * 60 + studioStartTime[2];
    let studioEndTime = studio.end_time.split(':').map(Number)
    studioEndTime = studioEndTime[0] * 60 * 60 + studioEndTime[1] * 60 + studioEndTime[2];
    if (bookingStartTime <= studioStartTime) {
        if (bookingEndTime >= studioEndTime) {
            req.body.bookingTiming = { bookingStartTime, bookingEndTime }
            next()
        } else {
            return res.status(404).send({ message: `Studio closes at ${studio.end_time}` })
        }
    } else {
        return res.status(404).send({ message: `Studio opens at ${studio.start_time}` })
    }
}

const bookingSlotValidator = async (req, res, next) => {
    const { date } = req.body;
    let { bookingStartTime, bookingEndTime } = req.body;
    try {
        const appointments = await AppointmentModel.find({ date: date, status: 'Accepted' })
        if (appointments.length == 0) {
            next()
        } else {
            let flag = true;
            appointments.forEach(appointment => {
                let start_time = appointment.start_time.split(':').map(Number);
                let appointmentStartTime = start_time[0] * 60 * 60 + start_time[1] * 60 + start_time[2];
                let end_time = appointment.end_time.split(':').map(Number);
                let appointmentEndTime = end_time[0] * 60 * 60 + end_time[1] * 60 + end_time[2];
                if (bookingStartTime >= appointmentStartTime && bookingEndTime <= appointmentEndTime) {
                    flag = false;
                }
            })
            if (flag) {
                next()
            } else {
                return res.status(404).send({ message: 'Slot not available on given time' })
            }
        }

    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
}

module.exports = {
    studioIdValidator, bookingDayValidator, bookingSlotValidator, bookingTimeValidator
}