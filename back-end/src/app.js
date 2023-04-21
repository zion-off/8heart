require('dotenv').config({ silent: true }) 
const express = require("express")
const bodyParser = require('body-parser');
const cors = require('cors') 
const cookieParser = require("cookie-parser") 
require("dotenv").config({ silent: true })
const jwt = require("jsonwebtoken")
const passport = require("passport")
const jwtStrategy = require("./config/jwt.config.js")
passport.use(jwtStrategy)
const app = express() 
app.use(passport.initialize())
const mongoose = require("mongoose")

if (process.env.NODE_ENV === "production") {
    console.log("Production mode activated.");
    mongoose
        .connect(`${process.env.DB_CONNECTION_STRING}`)
        .then(data => console.log(`Connected to MongoDB`))
        .catch(err => console.error(`Failed to connect to MongoDB: ${err}`));
} else {
    console.log("Testing mode activated.");
}

const rankingRouter = require('./routes/ranking.route.js');

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()) 

app.use(`/ranking`, rankingRouter);

module.exports = app