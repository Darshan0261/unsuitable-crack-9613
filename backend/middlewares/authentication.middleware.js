const jwt = require('jsonwebtoken');
const { BlacklistModel } = require('../models/Blacklist.model');
require('dotenv').config()

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.KEY, async function (err, decoded) {
            if (err) {
                 res.status(501).send({ message: err.message });
                 return
            }
            req.body.token = decoded;
            try {
                if (decoded.role == 'user') {
                    const blacklist = await BlacklistModel.findOne({ user_id: decoded.id });
                    if (blacklist.tokens.some(item => {
                        return item == token;
                    })) {
                        res.status(401).send({ message: 'Login Again' })
                        return
                    } else {
                        next()
                    }
                } else {
                    const blacklist = await BlacklistModel.findOne({ studio_id: decoded.id });
                    if (blacklist.tokens.some(item => {
                        return item == token;
                    })) {
                         res.status(401).send({ message: 'Login Again' })
                         return
                    } else {
                        next()
                    }
                }
            } catch (error) {
                 res.status(501).send({message: error.message})
                 return
            }
        });
    } else {
         res.send(401).send({ message: 'Login Again' })
         return
    }
}

module.exports = {
    authentication
}