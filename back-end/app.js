require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
app.use(cors());
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

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB.`);
} catch (err) {
  console.log(
    `Error connecting to MongoDB user account authentication will fail: ${err}`
  );
}

app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }))
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 
app.use(cors({ origin: process.env.FRONT_END_DOMAIN, credentials: true }))

const authenticationRoutes = require("./routes/authentication-routes.js")
const cookieRoutes = require("./routes/cookie-routes.js")
const rankingRouter = require("./routes/ranking.route.js");
const protectedContentRoutes = require("./routes/protected-content-routes.js");
app.use("/cookie", cookieRoutes());
app.use("/auth", authenticationRoutes());
app.use("/ranking", rankingRouter);
app.use("/protected", protectedContentRoutes());

module.exports = app;
