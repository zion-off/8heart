const express = require('express');
const router = express.Router();
const User = require("../models/User.js");

const rankingController = require("../controllers/ranking.controller.js");

router.post("/update", rankingController.updateRanking);

module.exports = router;