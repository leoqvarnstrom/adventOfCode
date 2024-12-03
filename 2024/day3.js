const { readInput } = require('../utils');

const findNextSub = (stringToHandle, stringPart, partMaxLen) => {
  const result = {
    numbers: [],
    remainingString: stringToHandle,
  }
  const subStart = stringToHandle.indexOf(stringPart);
  if (subStart === -1) {
    return result;
  }
  const subEnd = stringToHandle.indexOf(')', subStart);
  if (subEnd === -1) {
    return result;
  }
  result.remainingString = stringToHandle.substring(subStart+1);
  if (subEnd - subStart > partMaxLen) {
    return result;
  }
  const mathPart = stringToHandle.substring(subStart + stringPart.length, subEnd);
  const numbers = mathPart.split(',');
  if (numbers.length === 2 && numbers.every(num => !isNaN(num))) {
    result.numbers.push(...numbers);
  }
  return result;
}

const runTests = () => {
  const maxString = 'mul(123,123)';
  const minString = 'mul(1,1)';
  const stringPart = 'mul('
  const testNextSub = stringToTest => findNextSub(stringToTest, stringPart, maxString.length);
  const string1 = 'oisj821020umul(123.3)jsdmul(((((mul(100,300)iioisamul921mul()mul(asd,321)asdhijiomul(3,3)asdmul(';
  const { numbers: res1, remainingString: rem1 } = testNextSub(string1);
  const { numbers: res2, remainingString: rem2 } = testNextSub(rem1);
  const { numbers: res3, remainingString: rem3 } = testNextSub(rem2);
  const { numbers: res4, remainingString: rem4 } = testNextSub(rem3);
  const { numbers: res5, remainingString: rem5 } = testNextSub(rem4);
  const { numbers: res6, remainingString: rem6 } = testNextSub(rem5);

  const lastPart = rem6;
  const { numbers: resX, remainingString: remX } = testNextSub(lastPart);

  const tests = {
    noComma: Array.isArray(res1) && res1.length === 0,
    noEndBracket: Array.isArray(res2) && res2.length === 0,
    correctValue1: Array.isArray(res3) && res3.length === 2 && +res3[0] * +res3[1] === 30000,
    emptyBrackets: Array.isArray(res4) && res4.length === 0,
    nanInBrackets: Array.isArray(res5) && res5.length === 0,
    correctValue2: Array.isArray(res6) && res6.length === 2 && +res6[0] * +res6[1] === 9,
    endOfString: Array.isArray(resX) && resX.length === 0 && remX === lastPart
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
  const input = readInput('inputs/day3.txt')

  const maxString = 'mul(123,123)';
  const minString = 'mul(1,1)';
  const stringPart = 'mul(';

  runTests();

  let stringToHandle = input;
  let endOfString = false;
  let sum = 0;
  while (!endOfString) {
    const { numbers, remainingString } = findNextSub(stringToHandle, stringPart, maxString.length);
    if (remainingString === stringToHandle) {
      endOfString = true;
      break;
    }
    stringToHandle = remainingString;
    if (numbers.length === 2) {
      sum += +numbers[0] * +numbers[1];
    }
  }

  const partOneAns = sum;

  const partTwoAns = null;

  console.log({partOneAns}, {partTwoAns});
})()