const jwt = require('jsonwebtoken');
require('dotenv').config()

const authentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.KEY, function (err, decoded) {
            if(err) {
                return res.status(501).send({message: err.message});
            }
            req.body.token = decoded;
            next()
        });
    } else {
        return res.send(401).send({message: 'Login Again'})
    }
}

module.exports = {
    authentication
}