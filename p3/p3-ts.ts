export {};
import * as fs from 'fs';
import { strict as assert } from 'assert';

const FILENAME = 'p3/p3_input.txt';

const getData = (fn: string) => fs.readFileSync(fn).toString().split('\n');

const isLowerCase = (input: string) => {
  return input === String(input).toLowerCase();
};

const findTotal = (arr: string[]) => {
  let total = 0;
  arr.forEach((el) => {
    const h1 = el.slice(0, el.length / 2);
    const h2 = el.slice(el.length / 2, el.length);
    const shared = h1.split('').find((l) => h2.includes(l)) || undefined;
    if (!shared) {
      return;
    }
    assert.equal(shared.length, 1);
    const unicode = shared.codePointAt(0) || undefined;
    if (!unicode) {
      return;
    }
    const val = isLowerCase(shared) ? unicode - 96 : unicode - 64 + 26;
    total += val;
  });
  return total;
};

const findTotalP2 = (arr: string[]) => {
  let total = 0;
  for (let i = 0; i < arr.length; i += 3) {
    const [h1, h2, h3] = arr.slice(i, i + 3);
    const shared =
      h1.split('').find((l) => h2.includes(l) && h3.includes(l)) || undefined;
    if (!shared) {
      return;
    }
    assert.equal(shared.length, 1);
    const unicode = shared.codePointAt(0) || undefined;
    if (!unicode) {
      return;
    }
    const val = isLowerCase(shared) ? unicode - 96 : unicode - 64 + 26;
    total += val;
  }
  return total;
};

function main() {
  const data: string[] = getData(FILENAME);
  const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(total, totalP2);
}

main();
