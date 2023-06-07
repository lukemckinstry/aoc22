export {};
import * as fs from 'fs';

const filename = 'p1_input.txt'

const getData = (filename: string) =>
  fs.readFileSync('p1_input.txt', 'utf-8').toString().split("\n");

const findMax = (arr: string[]) => {
  let max = 0;
  let subTotal = 0;
  arr.forEach(el => {
      if (el === "") {  
          if (subTotal > max) {
              max = subTotal
          }
          subTotal = 0
      } else {
          subTotal += parseInt(el)
      } 
  });
  return max
  }

const findTopThree = (arr: string[]) => {
  let totals: number[] = [];
  let subTotal = 0;
  arr.forEach(el => {
    if (el === "") {  
      totals.push(subTotal)
        subTotal = 0
      } else {
        subTotal += parseInt(el)
      } 
  });
  const sArr = 
    totals
      .sort((a,b) => b-a)
      .slice(0,3)
      .reduce((a,b) => a+b, 0)
  return sArr
}

function main() {
  const data: string[] = getData(filename)
  const max: number = findMax(data)
  const topThree: number = findTopThree(data)
  console.log("max --> ", max)
  console.log("topThree --> ", topThree)
}

main()