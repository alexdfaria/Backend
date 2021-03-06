var bd = require('./connection')
const express = require('express')
// var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const restaurantsRoute = require('./routes/restaurants')
const reservationsRoute = require('./routes/reservations')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3001

const app = express()
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("Connected to DB"));

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api/users', authRoute)
app.use('/api/restaurants', restaurantsRoute)
app.use('/api/reservations', reservationsRoute)
app.listen(PORT, () => console.log("Server Up and Running"))