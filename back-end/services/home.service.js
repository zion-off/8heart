const axios = require("axios");
const { one, two, three, four, five } = require('../../front-end/src/assets/tier.js');

async function generateText(transcript) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `From most preferred to least preferred, my partner's love languages are: ${one}, ${two}, ${three}, ${four}, and ${five}. ${transcript} Answer based on the given information.`,
        max_tokens: 500,
        temperature: 0.7,
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
