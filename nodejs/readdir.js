var testFolder = "./data";
var fs = require("fs");
// 파일 배열  출력 하기
fs.readdir(testFolder, (err, files) => {
    files.forEach((file) => {
        console.log(file);
    });
});