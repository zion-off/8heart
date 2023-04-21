const express = require('express');
const router = express.Router();

const rankingController = require("../controllers/ranking.controller.js");

router.post("/save-survey-response", rankingController.updateRanking);

module.exports = router;