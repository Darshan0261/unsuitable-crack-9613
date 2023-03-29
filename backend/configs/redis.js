const redis = require('redis')
require('dotenv').config()

const redisClient = redis.createClient({
    password: process.env.redisPass,
    socket: {
        host: process.env.redisHost,
        port: process.env.redisPort
    }
});

module.exports = {
    redisClient
}