require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors())
app.use(express.json());

const rankingRouter = require("./routes/ranking.route.js");
app.use("/ranking", rankingRouter);

module.exports = app;
