const fs = require('fs');
const _ = require('lodash');

const FILENAME = 'p10/p10_input.txt';

const getData = (fn) => fs.readFileSync(fn).toString().split('\n');

const findTotal = (arr) => {
  let register = { val: 1, cycle: 1 };
  let queue = [];
  const checks = [20, 60, 100, 140, 180, 220];
  const totals = {};
  while (arr.length || queue.length) {
    if (queue.length) {
      console.log('queue ', queue);
      const regX_inst = queue.shift();
      register['val'] += regX_inst;
      register['cycle'] += 1;
    } else {
      const inst = arr.shift();
      if (inst === 'noop') {
        queue.push(0);
      }
      if (inst.slice(0, 4) === 'addx') {
        const val = parseInt(inst.slice(4));
        queue.push(0, val);
      }
    }
    if (checks.includes(register['cycle'])) {
      console.log(
        'cycle ',
        register['cycle'],
        ' val ',
        register['val'] * register['cycle']
      );
      totals[register['cycle']] = register['val'] * register['cycle'];
    }
  }
  sumTotal = Object.values(totals).reduce((x, y) => x + y, 0);
  return sumTotal;
};

const findTotalP2 = (arr) => {
  let register = { val: 1, cycle: 1 };
  let queue = [];
  let pixels = '';
  while (arr.length || queue.length) {
    if (queue.length) {
      if (
        register['val'] - 1 <= (register['cycle'] - 1) % 40 &&
        register['val'] + 1 >= (register['cycle'] - 1) % 40
      ) {
        pixels = pixels.concat('#');
      } else {
        pixels = pixels.concat('.');
      }
      const regX_inst = queue.shift();
      register['val'] += regX_inst;
      register['cycle'] += 1;
    } else {
      const inst = arr.shift();
      if (inst === 'noop') {
        queue.push(0);
      }
      if (inst.slice(0, 4) === 'addx') {
        const val = parseInt(inst.slice(4));
        queue.push(0, val);
      }
    }
  }
  const render = pixels
    .split('')
    .map((c, idx) => (idx % 40 === 0 && idx > 0 ? '\n'.concat(c) : c))
    .join('');
  console.log(render);
  return 0;
};

function main() {
  const data = getData(FILENAME);
  console.log(data.length);
  //const total = findTotal(data);
  const totalP2 = findTotalP2(data);
  console.log(totalP2);
}

main();
