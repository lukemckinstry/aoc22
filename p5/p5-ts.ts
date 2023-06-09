export {};
import * as fs from 'fs';

const FILENAME = 'p5/p5_input.txt';

const getData = (fn: string) =>
  fs
    .readFileSync(fn)
    .toString()
    .split('\n')
    .map((r) => r.split(','))
    .map((x) => x[0])
    .map((x) => x.split(' '));

type StackType = Record<string, string[]>;

const stacks: StackType = {
  '1': ['F', 'C', 'P', 'G', 'Q', 'R'],
  '2': ['W', 'T', 'C', 'P'],
  '3': ['B', 'H', 'P', 'M', 'C'],
  '4': ['L', 'T', 'Q', 'S', 'M', 'P', 'R'],
  '5': ['P', 'H', 'J', 'Z', 'V', 'G', 'N'],
  '6': ['D', 'P', 'J'],
  '7': ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'],
  '8': ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'],
  '9': ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W']
};

const findTotal = (arr: string[][]) => {
  arr.forEach((move) => {
    const [num, source, dest] = [move[1], move[3], move[5]];
    let count: number = parseInt(num);
    while (count > 0) {
      const toMove = stacks[source].pop() || undefined;
      if (!toMove) {
        return;
      }
      stacks[dest].push(toMove);
      count -= 1;
    }
  });
  const tops = Object.values(stacks)
    .map((x) => x.slice(-1))
    .join('');
  return tops;
};

const findTotalP2 = (arr: string[][]) => {
  arr.forEach((move) => {
    const [num, source, dest] = [move[1], move[3], move[5]];
    let count = parseInt(num);
    const sourceSize = stacks[source].length;
    const index = sourceSize - count;
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
  const data: string[][] = getData(FILENAME);
  const total = findTotal(data);
  //const totalP2 = findTotalP2(data);
  console.log(total);
}

main();
