const fs = require('fs');

exports.saveResults = async (results) => {
  const jsonResults = JSON.parse(results);
  const data = `export const ranks = ${JSON.stringify(jsonResults)};`;

  return new Promise((resolve, reject) => {
    fs.writeFile('../json/ranks.json', data, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log('Results saved to ranking.js');
        resolve();
      }
    });
  });
};
