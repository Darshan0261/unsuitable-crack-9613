const express = require('express');
const {connection}  = require('./configs/db')
require('dotenv').config()

const app = express();

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log('Connected to DB');
    } catch (error) {
        console.log(error.message);
        console.log('Cannot connect to DB');
    }
    console.log(`Server is running on port ${process.env.PORT}`);
})