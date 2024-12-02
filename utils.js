const fs = require('fs');

const readInput = (input) => {
  return fs.readFileSync(input, 'utf-8');
}

const arrayDeleteIndex = (arr, idx) => {
  const copyArr = JSON.parse(JSON.stringify(arr));
  copyArr.splice(idx, 1);
  return copyArr;
}

module.exports = { readInput, arrayDeleteIndex }