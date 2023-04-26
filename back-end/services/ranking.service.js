const mongoose = require("mongoose");
const User = require("../models/User.js");
const { useParams } = require('react-router-dom');

async function logRanking(loveLanguages, req) {
  // Updated parameter
  const [one, two, three, four, five] = loveLanguages; // Destructuring the array
  console.log("ranking update:");
  console.log(one);
  console.log(two);
  console.log(three);
  console.log(four);
  console.log(five);
  const findUsername = req.body.uniqueLink;
  console.log("looking for user with uniqueLink:");
  console.log(findUsername);

  const updateObject = {
    one,
    two,
    three,
    four,
    five,
  };

  const user = await User.findOneAndUpdate(
    { uniqueLink: findUsername },
    updateObject,
    { new: true }
  );
}

module.exports = {
  logRanking,
};
