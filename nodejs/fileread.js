var fs = require("fs");
// node js 모듈  파일 시스템(fs) : file system
//fs 라는 변수를 이용해서
fs.readFile("nodejs/sample.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
});