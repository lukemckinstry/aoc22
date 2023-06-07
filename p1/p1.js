const fs = require('fs');

const FILENAME = "p1_input.txt"

const getData = (fn) => 
    fs.readFileSync(fn)
        .toString()
        .split("\n")

const findMax = (arr) => {
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

const findTopThree = (arr) => {
    let totals = [];
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
    const data = getData(FILENAME);
    const max = findMax(data)
    const topThree = findTopThree(data) 
    console.log(topThree)
}

main()

