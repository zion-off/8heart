require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(express.json());
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtStrategy = require("./config/jwt-config.js");
passport.use(jwtStrategy);
app.use(passport.initialize());
const mongoose = require("mongoose");
const User = require("./models/User.js");
const homeRouter = require('./routes/home.route.js');
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true }))
try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB.`);
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  );
}
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 


const authenticationRoutes = require("./routes/authentication-routes.js")
const cookieRoutes = require("./routes/cookie-routes.js")
const rankingRouter = require("./routes/ranking.route.js");
const protectedContentRoutes = require("./routes/protected-content-routes.js");
const linkInfo = require("./routes/signupmessage.route.js");
const linkRouter = require("./routes/uniquelink.route.js");
app.use("/cookie", cookieRoutes());
app.use("/auth", authenticationRoutes());
app.use("/users/:uniqueLink", linkRouter);
app.use("/protected", protectedContentRoutes());
app.use("/home", homeRouter);
app.use("/linkinfo", linkInfo);
app.use("/ranking", rankingRouter)

module.exports = app;
