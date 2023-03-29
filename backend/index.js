const express = require('express');
const { connection } = require('./configs/db')
const { redisClient } = require('./configs/redis')
const { userRouter } = require('./routes/Users.router');
const { studioRouter } = require('./routes/Studio.router');
const { appointmentRouter } = require('./routes/Appointment.router');
const cors=require("cors");

require('dotenv').config()

const app = express();
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Base API Endpoint');
})

app.use('/users', userRouter)
app.use('/studios', studioRouter)
app.use('/appointment', appointmentRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error.message);
        console.log('Cannot connect to DB');
        return;
    }
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.log(error.message);
        console.log('Cannot connect to Redis');
        return;
    }
    console.log(`Server is running on port ${process.env.PORT}`);
})