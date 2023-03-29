const mongoose = require('mongoose');

const StudioSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'studio'
    },
    price: {
        type: Number,
        required: true
    },
    profile_image: String,
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip_code: {
        type: Number,
        required: true
    },
    working_days: {
        type: [{type: Number, enum: [0,1,2,3,4,5,6]}],
        required: true
    },
    start_hour: {
        type: String,
        required: true
    },
    end_hour: {
        type: String,
        required: true
    }
})

const StudioModel = mongoose.model('studio', StudioSchema)

module.exports = {
    StudioModel
}