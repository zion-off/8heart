const mongoose = require("mongoose");
const User = require("../models/User.js");

async function logRanking(loveLanguages, req) {
  // Updated parameter
  const [one, two, three, four, five] = loveLanguages; // Destructuring the array
  console.log("ranking update:");
  console.log(one);
  console.log(two);
  console.log(three);
  console.log(four);
  console.log(five);
  const findUsername = req.cookies.nameCookie;
  console.log("looking for user:");
  console.log(findUsername);

  const updateObject = {
    one,
    two,
    three,
    four,
    five,
  };

  const user = await User.findOneAndUpdate(
    { username: findUsername },
    updateObject,
    { new: true }
  );
}

module.exports = {
  logRanking,
};
