const rankingService = require("../services/ranking.service.js");

const updateRanking = async (req, res, next) => {
  try {
    const { loveLanguages } = req.body;
    await rankingService.logRanking(loveLanguages, req);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateRanking,
};
