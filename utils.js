const fs = require('fs');

const readInput = (input) => {
  return fs.readFileSync(input, 'utf-8');
}

module.exports = { readInput }