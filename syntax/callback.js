// function a() {
//     console.log("A");
// }
// // 위 와 아래는 같은 함수 입니다!
const a = function() {
    console.log("A");
};
// 자스에서는 함수가 값이다!



funcrion slowfunc(callback) {
    callback();
}

showfunc(a);