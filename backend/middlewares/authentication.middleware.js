const jwt = require('jsonwebtoken');
const { BlacklistModel } = require('../models/Blacklist.model');
require('dotenv').config()

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.KEY, async function (err, decoded) {
            if (err) {
                return res.status(501).send({ message: err.message });
            }
            req.body.token = decoded;
            try {
                if (decoded.role == 'user') {
                    const blacklist = await BlacklistModel.findOne({ user_id: decoded.id });
                    if (blacklist.tokens.some(item => {
                        return item == token;
                    })) {
                        return res.status(401).send({ message: 'Login Again' })
                    } else {
                        next()
                    }
                } else {
                    const blacklist = await BlacklistModel.findOne({ studio_id: decoded.id });
                    if (blacklist.tokens.some(item => {
                        return item == token;
                    })) {
                        return res.status(401).send({ message: 'Login Again' })
                    } else {
                        next()
                    }
                }
            } catch (error) {
                return res.status(501).send({message: error.message})
            }
        });
    } else {
        return res.send(401).send({ message: 'Login Again' })
    }
}

module.exports = {
    authentication
}