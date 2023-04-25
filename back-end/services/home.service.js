const axios = require("axios");
const mongoose = require("mongoose");
const User = require("../models/User.js");

async function generateText(transcript, nameCookie, req) {
  try {
    console.log("nameCookie from backend: ", nameCookie);
    const user = await User.findOne({ username: nameCookie });
    if (!user) {
      throw new Error("User not found in database");
    }
    const first = user.one;
    const second = user.two;
    const third = user.three;
    const fourth = user.four;
    const fifth = user.five;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `From most preferred to least preferred, my partner's love languages are: ${first}, ${second}, ${third}, ${fourth}, and ${fifth}. ${transcript}. Answer based on the given information, but don't give me a list of their love languages.`,
        temperature: 0.1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
        },
      }
    );
    return response.data.choices[0].text.trim();
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  generateText,
};
