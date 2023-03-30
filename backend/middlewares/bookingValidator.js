const { AppointmentModel } = require("../models/Appoinment.model");


// Check if studio is open on date 
// studioIdValidator middleware needs to be used before using bookingDayValidator
const bookingDayValidator = (req, res, next) => {
    let { date } = req.body;
    if (!date) {
        return res.status(428).send({ message: 'Date is required' });
    }
    let bookingDate = new Date(date)
    let bookingDay = bookingDate.getDay();
    const { studio } = req.body;
    // Check if booking slot is in studio working day
    if (studio.working_days.some(day => {
        return day == bookingDay
    })) {
        next()
    } else {
        return res.status(404).send({ message: `Studio is closed on ${date}` })
    }
}

// Check if studio is open on time 
// bookingDayValidator middleware needs to be used before using bookingTimeValidator
const bookingTimeValidator = (req, res, next) => {
    let { start_time, end_time } = req.body;
    const { studio } = req.body;

    start_time = start_time.split(':').map(Number);
    let bookingStartTime = start_time[0] * 100 + start_time[1];
    end_time = end_time.split(':').map(Number);
    let bookingEndTime = end_time[0] * 100 + end_time[1];

    let studioStartTime = studio.start_time.split(':').map(Number)
    studioStartTime = studioStartTime[0] * 100 + studioStartTime[1];
    let studioEndTime = studio.end_time.split(':').map(Number)
    studioEndTime = studioEndTime[0] * 100 + studioEndTime[1];

    if (bookingStartTime >= studioStartTime) {
        if (bookingEndTime <= studioEndTime) {
            req.body.bookingTiming = { bookingStartTime, bookingEndTime }
            next()
        } else {
            return res.status(404).send({ message: `Studio closes at ${studio.end_time}` })
        }
    } else {
        return res.status(404).send({ message: `Studio opens at ${studio.start_time}` })
    }
}

// Check if slot is available on given date and time
// bookingDayValidator & bookingTimeValidator middleware needs to be used before using bookingSlotValidator
const bookingSlotValidator = async (req, res, next) => {
    const { date, studio } = req.body;
    const { bookingTiming } = req.body;
    let { bookingStartTime, bookingEndTime } = bookingTiming;
    try {
        const appointments = await AppointmentModel.find({ date: date, status: 'Accepted' })
        if (appointments.length == 0) {
            const bill = (bookingEndTime - bookingStartTime) / 100 * studio.price;
            req.body.bill = bill;
            next()
        } else {
            let flag = true;
            appointments.forEach(appointment => {

                let start_time = appointment.start_time.split(':').map(Number);
                let appointmentStartTime = start_time[0] * 100 + start_time[1];

                let end_time = appointment.end_time.split(':').map(Number);
                let appointmentEndTime = end_time[0] * 100 + end_time[1];

                if (bookingStartTime >= appointmentStartTime && bookingStartTime <= appointmentEndTime) {
                    flag = false;
                }
                if (bookingEndTime >= appointmentStartTime && bookingEndTime <= appointmentEndTime) {
                    flag = false;
                }
            })
            if (flag) {
                const bill = (bookingEndTime - bookingStartTime) / 100 * studio.price;
                req.body.bill = bill;
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
    bookingDayValidator, bookingSlotValidator, bookingTimeValidator
}