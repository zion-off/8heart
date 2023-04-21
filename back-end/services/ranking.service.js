const fs = require("fs");
const path = require("path");
const tierFilePath = path.resolve(__dirname, "../../front-end/src/assets/tier.js");

async function logRanking(loveLanguages) {
  // Updated parameter
  const [one, two, three, four, five] = loveLanguages; // Destructuring the array

  const newTierContent = `
  let one = '${one}';
  let two = '${two}';
  let three = '${three}';
  let four = '${four}';
  let five = '${five}';

  export { one, two, three, four, five };
`.trim();

  fs.writeFileSync(tierFilePath, newTierContent);

  console.log(`New ranking values written to ${tierFilePath}`);
}

module.exports = {
  logRanking,
};
