const homeService = require("../services/home.service");

const generateText = async (req, res, next) => {
  try {
    const { transcript, nameCookie } = req.body;
    const text = await homeService.generateText(transcript, nameCookie, req);
    console.log("text: ", text);
    res.json(text);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateText,
};
