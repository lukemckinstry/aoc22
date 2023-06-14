export {};
import * as fs from 'fs';
const _ = require('lodash');

const FILENAME = 'p9/p9_input.txt';

const getData = (fn: string) => fs.readFileSync(fn).toString().split('\n');

const get_head_to_tail = (posH: number[], posT: number[]) => {
  const dist = posH.map((v, idx) => v - posT[idx]);
  return dist;
};

const move_head = (direction: string, posH: number[]) => {
  const key: Record<string, number[]> = {
    U: [0, 1],
    D: [0, -1],
    L: [-1, 0],
    R: [1, 0]
  };
  const move = key[direction];
  return posH.map((v, idx) => v + move[idx]);
};

const move_tail = (head_to_tail: number[], posT: number[]) => {
  const key: number[][][] = [
    [
      [2, 0],
      [1, 0]
    ],
    [
      [-2, 0],
      [-1, 0]
    ],
    [
      [0, 2],
      [0, 1]
    ],
    [
      [0, -2],
      [0, -1]
    ],
    //diagonals
    [
      [2, 1],
      [1, 1]
    ],
    [
      [2, -1],
      [1, -1]
    ],
    [
      [-2, 1],
      [-1, 1]
    ],
    [
      [-2, -1],
      [-1, -1]
    ],
    [
      [1, 2],
      [1, 1]
    ],
    [
      [-1, 2],
      [-1, 1]
    ],
    [
      [1, -2],
      [1, -1]
    ],
    [
      [-1, -2],
      [-1, -1]
    ],
    //2x2 moves
    [
      [2, 2],
      [1, 1]
    ],
    [
      [2, -2],
      [1, -1]
    ],
    [
      [-2, 2],
      [-1, 1]
    ],
    [
      [-2, -2],
      [-1, -1]
    ]
  ];
  const elem = key.find((x) => _.isEqual(x[0], head_to_tail));
  if (!elem) {
    return;
  }
  const move: number[] = elem[1];
  return posT.map((v, idx) => v + move[idx]);
};

const findTotal = (arr: string[]) => {
  let posH = [0, 0];
  let posT = [0, 0];
  let visitedT = [JSON.stringify([0, 0])];
  arr.forEach((step) => {
    const direction = step.slice(0, 1);
    let steps_to_move = parseInt(step.slice(1));
    while (steps_to_move > 0) {
      posH = move_head(direction, posH);
      const head_to_tail = get_head_to_tail(posH, posT);
      const max_distance = Math.max(...head_to_tail.map((h) => Math.abs(h)));
      if (max_distance > 1) {
        const tailMove = move_tail(head_to_tail, posT);
        if (!tailMove) {
          return;
        }
        posT = tailMove;
        const pair = JSON.stringify(posT);
        if (!visitedT.includes(pair)) {
          visitedT.push(pair);
        }
      }
      steps_to_move -= 1;
    }
  });
  return visitedT.length;
};

const findTotalP2 = (arr: string[]) => {
  let pos = Array(10).fill([0, 0]);
  let visitedT = [JSON.stringify([0, 0])];
  arr.forEach((step) => {
    const direction = step.slice(0, 1);
    let steps_to_move = parseInt(step.slice(1));
    while (steps_to_move > 0) {
      pos[0] = move_head(direction, pos[0]);
      for (let k = 1; k < 10; k++) {
        const head_to_tail = get_head_to_tail(pos[k - 1], pos[k]);
        const max_distance = Math.max(...head_to_tail.map((h) => Math.abs(h)));
        if (max_distance > 1) {
          pos[k] = move_tail(head_to_tail, pos[k]);
          if (k === 9) {
            let pair = JSON.stringify(pos[k]);
            if (!visitedT.includes(pair)) {
              visitedT.push(pair);
            }
          }
        }
      }
      steps_to_move -= 1;
    }
  });
  return visitedT.length;
};

function main() {
  const data: string[] = getData(FILENAME);
  const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(total, totalP2);
}

main();
