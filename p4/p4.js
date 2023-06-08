const fs = require('fs');

const FILENAME = 'p4/p4_input.txt';

const getData = (fn) =>
  fs
    .readFileSync(fn)
    .toString()
    .split('\n')
    .map((r) => r.split(',').map((a) => a.split('-').map((a) => parseInt(a))));

const findTotal = (arr) => {
  let total = 0;
  arr.forEach((el) => {
    const [g, h] = el;
    const [g1, g2] = g;
    const [h1, h2] = h;
    if ((g1 >= h1 && g2 <= h2) || (h1 >= g1 && h2 <= g2)) {
      total += 1;
    }
  });
  return total;
};

const findTotalP2 = (arr) => {
  let total = 0;
  arr.forEach((el) => {
    const [g, h] = el;
    const [g1, g2] = g;
    const [h1, h2] = h;
    if ((g1 >= h1 && g2 <= h2) || (h1 >= g1 && h2 <= g2)) {
      total += 1;
      return;
    }
    if ((h1 <= g1 && g1 <= h2) || (g1 <= h1 && h1 <= g2)) {
      total += 1;
      return;
    }
  });
  return total;
};

function main() {
  const data = getData(FILENAME);
  const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(total, totalP2);
}

main();
