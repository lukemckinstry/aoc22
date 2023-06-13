const fs = require('fs');

const FILENAME = 'p8/p8_input.txt';

const getData = (fn) =>
  fs
    .readFileSync(fn)
    .toString()
    .split('\n')
    .map((x) => x.split('').map((x) => parseInt(x)));

const returnVisible = (xIdx, yIdx, arr) => {
  const pos = arr[xIdx][yIdx];
  const row = arr[xIdx];
  const col = arr.map((y) => y[yIdx]);

  if (
    xIdx === 0 ||
    xIdx === row.length - 1 ||
    yIdx === 0 ||
    yIdx === col.length - 1
  ) {
    return true;
  }

  const left = row.slice(0, yIdx);
  const right = row.slice(yIdx + 1);
  const up = col.slice(0, xIdx);
  const down = col.slice(xIdx + 1);

  const maxes = [left, right, up, down].map((x) =>
    x.length ? Math.max(...x) : 0
  );
  const min = Math.min(...maxes);
  if (pos > min) {
    return true;
  }
  return false;
};

const getNumLower = (pos, l) => {
  total = 0;
  while (l.length) {
    const t = l.shift();
    total += 1;
    if (t >= pos) {
      break;
    }
  }
  return total;
};

const getVisibility = (xIdx, yIdx, arr) => {
  const pos = arr[xIdx][yIdx];
  const row = arr[xIdx];
  const col = arr.map((y) => y[yIdx]);

  const left = row.slice(0, yIdx).reverse();
  const right = row.slice(yIdx + 1);
  const up = col.slice(0, xIdx).reverse();
  const down = col.slice(xIdx + 1);

  const total = [left, right, up, down]
    .filter((x) => x.length)
    .map((x) => getNumLower(pos, x))
    .reduce((a, b) => a * b, 1);
  return total;
};

const findTotal = (arr) => {
  let count = 0;
  arr.forEach((x, xIdx) => {
    x.forEach((y, yIdx) => {
      if (returnVisible(xIdx, yIdx, arr)) {
        count += 1;
      }
    });
  });
  return count;
};

const findTotalP2 = (arr) => {
  let maxVis = 0;
  arr.forEach((x, xIdx) => {
    x.forEach((y, yIdx) => {
      total = getVisibility(xIdx, yIdx, arr);
      if (total > maxVis) {
        maxVis = total;
      }
    });
  });
  return maxVis;
};

function main() {
  const data = getData(FILENAME);
  const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(total, totalP2);
}

main();
