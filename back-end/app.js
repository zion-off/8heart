require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const jwtStrategy = require("./config/jwt-config.js");
const mongoose = require("mongoose");
const User = require("./models/User.js");
const homeRouter = require('./routes/home.route.js');
const authenticationRoutes = require("./routes/authentication-routes.js");
const cookieRoutes = require("./routes/cookie-routes.js");
const rankingRouter = require("./routes/ranking.route.js");
const protectedContentRoutes = require("./routes/protected-content-routes.js");
const linkInfo = require("./routes/signupmessage.route.js");
const linkRouter = require("./routes/uniquelink.route.js");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }));

// CORS configuration
const allowedOrigins = ['https://8heart.vercel.app', 'https://8heart.zzzzion.com', 'https://8heart-yjn2.vercel.app', 'http://localhost:3000', 'http://localhost:8000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
}));

// Passport setup
passport.use(jwtStrategy);
app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

// Route setup
app.use("/cookie", cookieRoutes());
app.use("/auth", authenticationRoutes());
app.use("/users/:uniqueLink", linkRouter);
app.use("/protected", protectedContentRoutes());
app.use("/home", homeRouter);
app.use("/linkinfo", linkInfo);
app.use("/ranking", rankingRouter);

// Commented out manual CORS setup (not needed with cors middleware)
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", `process.env.FRONT_END_DOMAIN`);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

module.exports = app;