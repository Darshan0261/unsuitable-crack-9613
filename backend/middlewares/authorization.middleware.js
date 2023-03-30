const { BlacklistModel } = require("../models/Blacklist.model");

const userAuth = async (req, res, next) => {
    const {token} = req.body;
    if(token.role == 'user') {
        next()
    } else {
        return res.send(401).send({message: 'Login Again'})
    }
}

const studioAuth = (req, res, next) => {
    const {token} = req.body;
    if(token.role == 'studio') {
        next()
    } else {
        return res.send(401).send({message: 'Login Again'})
    }
}

module.exports = {
    studioAuth, userAuth
}