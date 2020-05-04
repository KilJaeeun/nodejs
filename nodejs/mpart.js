var M = {
    v: "v",
    f: () => {
        console.log(this.v);
    },
};

M.f();

module.exports = M; // m 이 가르키는 객체를 파일 밖에서 활용할 수 있게 함.