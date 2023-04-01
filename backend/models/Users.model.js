const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    profile_pic: String
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = {
    UserModel
}