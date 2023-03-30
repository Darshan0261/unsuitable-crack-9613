const express = require('express');
const { authentication } = require('../middlewares/authentication.middleware');
const { userAuth } = require('../middlewares/authorization.middleware');

const bookingRouter = express.Router();


module.exports = {
    bookingRouter
}