// var v1 = "v1";
// // 1000000 code
// v1 = "egoing";
// var v2 = "v2";

var p = {
    v1: "v1",
    v2: "v2",
    f1: () => {
        console.log(this.v1); //자신의 객체를 참고ㅏㄹ 떄, this 를 씁니다.
    },
    f2: () => {
        console.log(this.v2);
    },
};

p.f1();
p.f2();

/// 객체는 코드를 정리해주는 폴더 같은 역할이다.