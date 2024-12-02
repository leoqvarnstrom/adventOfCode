const { readInput, arrayDeleteIndex } = require('../utils');


const getDirection = (row) => row[0] < row[1] ? 'asc' : 'desc';
const hasLegalNextVal = (val, nextVal, direction, maxInterval) => {
  if (direction === 'asc') {
    return val < nextVal && val >= nextVal - maxInterval;
  } else {
    return val > nextVal && val <= nextVal + maxInterval;
  }
}
const hasNextVal = (arr, currentIndex) => currentIndex < arr.length - 1;

const countRowFails = (row, maxInterval, maxFails = 0, fails = 0) => {
  if (row.length < 2) {
    return fails;
  }
  const direction = getDirection(row);
  let index = 0;
  for (const val of row) {
    if (!hasNextVal(row, index)) {
      break;
    }
    const rowFailed = !hasLegalNextVal(val, row[index+1], direction, maxInterval);
    if (rowFailed) {
      fails++;
      if (fails > maxFails) {
        break;
      }
      const failsWithPreviousIndexRemoved = index === 0 ? null : countRowFails(arrayDeleteIndex(row, index-1), maxInterval, maxFails, fails);
      const failsWithCurrentIndexRemoved = countRowFails(arrayDeleteIndex(row, index), maxInterval, maxFails, fails);
      const failsWithNextIndexRemoved = countRowFails(arrayDeleteIndex(row, index+1), maxInterval, maxFails, fails);
      fails = failsWithPreviousIndexRemoved 
        ? Math.min(failsWithPreviousIndexRemoved, failsWithCurrentIndexRemoved, failsWithNextIndexRemoved)
        : Math.min(failsWithCurrentIndexRemoved, failsWithNextIndexRemoved)
      break;
    }
    index++;
  }
  return fails;
}

const isRowSafe = (row, maxInterval, maxFails = 0) => countRowFails(row, maxInterval, maxFails) <= maxFails; 


const runTests = () => {
  const maxInterval = 3;
  const ascSafe = isRowSafe([1,2,3,4], maxInterval);
  const descSafe = isRowSafe([4,3,2,1], maxInterval);
  const tooSmallSafe = isRowSafe([1], maxInterval);
  const emptySafe = isRowSafe([], maxInterval);
  const maxAscIntervalSafe = isRowSafe([1,4,7], maxInterval);
  const maxDescIntervalSafe = isRowSafe([7,4,1], maxInterval);
  const ascUnsafe = !isRowSafe([1,5,8], maxInterval);
  const descUnsafe = !isRowSafe([9,5,1], maxInterval);
  const ascLegalNextVal = hasLegalNextVal(3, 5, 'asc', 5);
  const descLegalNextVal = hasLegalNextVal(5, 3, 'desc', 5);
  const ascNonLegalNextVal = !hasLegalNextVal(5, 3, 'asc', 5);
  const descNonLegalNextVal = !hasLegalNextVal(3, 5, 'desc', 5);
  const directionAsc = getDirection([1,2]) === 'asc';
  const directionDesc = getDirection([2,1]) === 'desc';
  const doHasNextVal = hasNextVal([1,2], 0);
  const notHasNextVal = !hasNextVal([1,2], 1);
  const safeWithOneFail = isRowSafe([1,3,2,4], maxInterval, 1);
  const safeWithTwoFails = isRowSafe([1,3,2,5,4], maxInterval, 2);
  const notSafeWithOneFail = !isRowSafe([2,3,2,3,4], maxInterval, 1);
  const moreFailsThanMaxFails = countRowFails([1,2,3], maxInterval, 1, 2) !== 0 ;
  const safeWithLastIndexWrong = isRowSafe([1,2,3,1], maxInterval, 1);
  const safeWithFirstIndexWrong = isRowSafe([1,4,3,2], maxInterval, 1);


  const tests = {
    ascSafe,
    descSafe,
    tooSmallSafe,
    emptySafe,
    maxAscIntervalSafe,
    maxDescIntervalSafe,
    ascUnsafe,
    descUnsafe,
    ascLegalNextVal,
    descLegalNextVal,
    ascNonLegalNextVal,
    descNonLegalNextVal,
    directionAsc,
    directionDesc,
    doHasNextVal,
    notHasNextVal,
    safeWithOneFail,
    safeWithTwoFails,
    notSafeWithOneFail,
    moreFailsThanMaxFails,
    safeWithLastIndexWrong,
    safeWithFirstIndexWrong
  };
  const failedTests = Object.keys(tests).map(key => {
    if (tests[key] === false) {
      return { [key]: tests[key] }
    }
  }).filter(x => x);
  if (failedTests.length > 0) {
    console.log({failedTests})
  } else {
    console.log(`All ${Object.keys(tests).length} tests passed`);
  }
}

(() => {
  const input = readInput('inputs/day2.txt')
    .split('\n')
    .map(row => {
      return row.split(' ').filter(r => r !== '').map(r => Number(r));
    });

  const maxInterval = 3;

  runTests();

  let safeRowSum = 0;
  input.forEach(row => {
    if (isRowSafe(row, maxInterval)) {
      safeRowSum++;
    }
  });

  const partOneAns = safeRowSum; 

  safeRowSum = 0;
  input.forEach(row => {
    if (isRowSafe(row, maxInterval, 1)) {
      safeRowSum++;
    }
  });

  const partTwoAns = safeRowSum;

  console.log({partOneAns}, {partTwoAns});
})()