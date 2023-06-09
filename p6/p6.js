const fs = require('fs');

const FILENAME = 'p6/p6_input.txt';

const getData = (fn) => fs.readFileSync(fn).toString().split('\n');

const findTotal = (arr) => {
  const mem = [];
  const total = arr.split('').findIndex((el) => {
    mem.push(el);
    if (mem.length > 4) {
      mem.shift();
    }
    const checkSet = new Set(mem);
    return checkSet.size === 4;
  });
  return total + 1;
};

const findTotalP2 = (arr) => {
  const mem = [];
  const total = arr.split('').findIndex((el) => {
    mem.push(el);
    if (mem.length > 14) {
      mem.shift();
    }
    const checkSet = new Set(mem);
    return checkSet.size === 14;
  });
  return total + 1;
};

function main() {
  const data = getData(FILENAME);
  console.log(...data);
  const total = findTotal(...data);
  const totalP2 = findTotalP2(...data);
  console.log(total, totalP2);
}

main();
