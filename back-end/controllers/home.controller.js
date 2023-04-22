const homeService = require("../services/home.service");

const generateText = async (req, res, next) => {
  try {
    const { transcript } = req.body;
    const text = await homeService.generateText(transcript);
    console.log("text: ", text);
    res.json(text);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateText,
};
