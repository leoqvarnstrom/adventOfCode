const { readInput } = require('../utils');

(() => {
  const leftSide = [];
  const rightSide = [];

  const input = readInput('inputs/day1.txt')
    .split('\n')
    .map(row => {
      return row.split(' ').filter(r => r !== '')
    });

  input.forEach((row) => {
     leftSide.push(row[0]);
     rightSide.push(row[1]);
  });

  //Input only contains natural numbers, so sort can be used
  leftSide.sort();
  rightSide.sort();

  let sumDiff = 0;
  for (let i = 0; i < leftSide.length; i++) {
    const diff = +leftSide[i] - +rightSide[i];
    sumDiff += diff < 0 ? -diff : diff;
  };

  const partOneAns = sumDiff;

  let totalSimilarityScore = 0;
  leftSide.forEach(leftVal => {
    totalSimilarityScore += +leftVal * rightSide.filter(rightVal => rightVal === leftVal).length;
  });

  const partTwoAns = totalSimilarityScore;

  console.log({partOneAns}, {partTwoAns});
})()