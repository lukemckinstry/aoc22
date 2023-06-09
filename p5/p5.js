const fs = require('fs');

const FILENAME = 'p5/p5_input.txt';

const getData = (fn) =>
  fs
    .readFileSync(fn)
    .toString()
    .split('\n')
    .map((r) => r.split(','))
    .map((x) => x[0])
    .map((x) => x.split(' '));

const stacks = {
  1: ['F', 'C', 'P', 'G', 'Q', 'R'],
  2: ['W', 'T', 'C', 'P'],
  3: ['B', 'H', 'P', 'M', 'C'],
  4: ['L', 'T', 'Q', 'S', 'M', 'P', 'R'],
  5: ['P', 'H', 'J', 'Z', 'V', 'G', 'N'],
  6: ['D', 'P', 'J'],
  7: ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'],
  8: ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'],
  9: ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W']
};

// const stacks = {
//         "1": ["Z","N"],
//         "2": ["M","C","D"],
//         "3": ["P"]
//         }

const findTotal = (arr) => {
  arr.forEach((move) => {
    const [num, source, dest] = [move[1], move[3], move[5]];
    count = parseInt(num);
    while (count > 0) {
      stacks[dest].push(stacks[source].pop());
      count -= 1;
    }
  });
  const tops = Object.values(stacks)
    .map((x) => x.slice(-1))
    .join('');
  return tops;
};

const findTotalP2 = (arr) => {
  arr.forEach((move) => {
    const [num, source, dest] = [move[1], move[3], move[5]];
    count = parseInt(num);
    const sourceSize = stacks[source].length;
    const index = sourceSize - num;
    const toMove = stacks[source].splice(index, sourceSize);
    stacks[dest].push(...toMove);
    stacks[source] = stacks[source].splice(0, index);
  });
  const tops = Object.values(stacks)
    .map((x) => x.slice(-1))
    .join('');
  return tops;
};

function main() {
  const data = getData(FILENAME);
  //const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(totalP2);
}

main();
