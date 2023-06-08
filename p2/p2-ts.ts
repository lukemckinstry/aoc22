export {};
import * as fs from 'fs';

const FILENAME = 'p2/p2_input.txt';

const getData = (fn: string) =>
  fs
    .readFileSync(fn)
    .toString()
    .split('\n')
    .map((x) => x.split(' '));

type ShapeType = 'A' | 'B' | 'C';
type CodeType = 'X' | 'Y' | 'Z';
type ResultType = 't' | 'w' | 'l';

interface ScoreDetail {
  base: number;
  A: ResultType;
  B: ResultType;
  C: ResultType;
}

interface ScoreDetailP2 {
  base: number;
  t: ShapeType;
  l: ShapeType;
  w: ShapeType;
}

interface Scores {
  [index: string]: ScoreDetail;
}

interface ScoresP2 {
  [index: string]: ScoreDetailP2;
}

type ResultKey = Record<ResultType, number>;

type ResultKeyP2 = Record<CodeType, ResultType>;

const scores: Scores = {
  X: { base: 1, A: 't', B: 'l', C: 'w' }, // rock
  Y: { base: 2, A: 'w', B: 't', C: 'l' }, // paper
  Z: { base: 3, A: 'l', B: 'w', C: 't' } // scissors
};

const result_key: ResultKey = {
  w: 6,
  t: 3,
  l: 0
};

const scores_p2: ScoresP2 = {
  A: { base: 1, t: 'A', w: 'B', l: 'C' },
  B: { base: 2, l: 'A', t: 'B', w: 'C' },
  C: { base: 3, w: 'A', l: 'B', t: 'C' }
};

const result_key_p2: ResultKeyP2 = {
  X: 'l',
  Y: 't',
  Z: 'w'
};

const findTotal = (arr: [ShapeType, CodeType][]) => {
  let total = 0;
  arr.forEach((el) => {
    const [opp, me]: [ShapeType, CodeType] = el;
    const base_score: number = scores[me]['base'];
    const result: ResultType = scores[me][opp];
    const result_score = result_key[result];
    total += base_score + result_score;
  });
  return total;
};

const findTotalP2 = (arr: [ShapeType, CodeType][]) => {
  let total = 0;
  arr.forEach((el) => {
    const [opp, target_result_key] = el;
    const target_result = result_key_p2[target_result_key];
    const result_score = result_key[target_result];
    const me = scores_p2[opp][target_result];
    const base_score = scores_p2[me]['base'];
    total += base_score + result_score;
  });
  return total;
};

function main() {
  const data: string[][] = getData(FILENAME);
  const total = findTotal(data as [ShapeType, CodeType][]);
  const totalP2 = findTotalP2(data as [ShapeType, CodeType][]);
  console.log(total, totalP2);
}

main();
