const {Schema, default: mongoose} = require('mongoose');

const AppointmentSchema = new Schema({
    date: {
        type: String, // (mm/dd/yyyy)
        required: true
    },
    start_time: {
        type: String, // hh-mm-ss 
        required: true
    },
    end_time: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Accepted', 'Rejected']
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    studio_id: {
        type: Schema.Types.ObjectId,
        ref: 'studio',
        required: true
    },
    bill: {
        type: Number,
        required: true
    }
})

const AppointmentModel = mongoose.model('appointment', AppointmentSchema)

module.exports = {
    AppointmentModel
}