require("dotenv").config({ silent: true });
const express = require("express");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

const rankingRouter = require("./routes/ranking.route.js");
app.use("/save-survey-response", rankingRouter);

module.exports = app;
