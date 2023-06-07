"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var filename = 'p1_input.txt';
var getData = function (filename) {
    return fs.readFileSync('p1_input.txt', 'utf-8').toString().split("\n");
};
var findMax = function (arr) {
    var max = 0;
    var subTotal = 0;
    arr.forEach(function (el) {
        if (el === "") {
            if (subTotal > max) {
                max = subTotal;
            }
            subTotal = 0;
        }
        else {
            subTotal += parseInt(el);
        }
    });
    return max;
};
var findTopThree = function (arr) {
    var totals = [];
    var subTotal = 0;
    arr.forEach(function (el) {
        if (el === "") {
            totals.push(subTotal);
            subTotal = 0;
        }
        else {
            subTotal += parseInt(el);
        }
    });
    var sArr = totals
        .sort(function (a, b) { return b - a; })
        .slice(0, 3)
        .reduce(function (a, b) { return a + b; }, 0);
    return sArr;
};
function main() {
    var data = getData(filename);
    var max = findMax(data);
    var topThree = findTopThree(data);
    console.log("max --> ", max);
    console.log("topThree --> ", topThree);
}
main();
