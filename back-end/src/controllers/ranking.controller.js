const rankingService = require('../services/ranking.service');

exports.saveResults = async (req, res) => {
  const results = req.body.results;
  try {
    await rankingService.saveResults(results);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
