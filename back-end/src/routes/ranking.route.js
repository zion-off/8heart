const express = require('express');
const router = express.Router();
const rankingController = require('../controllers/ranking.controller');

router.post('/save-results', rankingController.saveResults);

module.exports = router;
