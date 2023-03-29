const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { userAuth } = require('../middlewares/authorization.middleware');

const bookingRouter = express.Router();

bookingRouter.post('/:id', authentication, userAuth, async (req, res) => {
    const { date, start_time, end_time, bill, token } = req.body;
    const studio_id = req.params['id'];
    const user_id = token.id;
    try {
        const studio = await StudioModel.findOne({ _id: studio_id })
        if (studio == null) {
            return res.status(404).send({ message: 'Studio not found' });
        }
        if (studio.status == false) {
            return res.status(404).send({ message: 'Studio not Available' })
        }
        const appointment = new AppointmentModel({ date, start_time, end_time, bill, studio_id, user_id });
        await appointment.save();
        res.send({ message: 'Appoinment Placed Successfully' })
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }

})


module.exports = {
    bookingRouter
}