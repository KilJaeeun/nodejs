var fs = require("fs");

//readFileSync  : 동기 적으로 처리 //A +>B+>C
// console.log("A");
// var result = fs.readFileSync("./syntax/sample.txt", "utf8");
// console.log(result);
// console.log("C");

console.log("A"); /// 비동기 적으로 처리: A+>C+>B
fs.readFile("./syntax/sample.txt", "utf8", (err, result) => {
    console.log(result); //콜백
});
console.log(result);
console.log("C");