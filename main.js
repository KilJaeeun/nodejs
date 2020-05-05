const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const compression = require("compression");
var topicRouter = require("./routes/topic");
var indexRouter = require("./routes/index");
const helmet = require("helmet");
app.use(helmet()); // 보안 에 이렇게 하면 좋다 한다..

//express 는 다 미들웨어 라고 생각하면 돼 : 서로 가 서로ㅡㄹ 연결해주는 미들웨어

// 미들웨어 start : 로딩하고 모든 브라우저 들어갈때마다 이 함수 부터 실행 (비효율 밯생 사능)
app.use(express.static("public")); //publice 디렉토리 안에서 static 을 찾겠다( static 루트 설정)
// form 데이터는 이렇게 처리하면 됩니다.
app.use(bodyParser.urlencoded({ extended: false })); // 미들웨어가 들어온다. 사용자가 브러우저에서 요청할때마다 미들웨어의 실행
/* json 타입으로 요할경우, 
app.use(bodyParser.json())  이렇게 처리하면 됩니다.
*/
app.use(compression());
//use : 언제나 가져오기, get 이렇게 하면 get일때만 가져옴
app.get("*", function(request, responser, next) {
    fs.readdir("./data", (error, files) => {
        // 글 목록을 표현해주는 기능
        request.list = files;
        next();
    });
});
// 미들웨어 end
//route, routing 갈림길에서 방향을 잡는 것, path 마다  적당히 길을 찾기
app.use("/", indexRouter);
app.use("/topic", topicRouter);
app.use(function(request, response, next) {
    response.status(404).send("Sorry, cant find that");
});
app.use(function(err, request, response, next) {
    console.error(err.stack);
    response.status(500).send("Something Error!");
});

app.listen(3000, () => console.log("Example app listening on port 3000"));

// var http = require("http");
// var fs = require("fs");
// var url = require("url");
// var qs = require("querystring"); // 쿼리 스링이라하는  노드 모듈
// var path = require("path");
// var template = require("./lib/template.js");
// var sanitizeHtml = require("sanitize-html");

// //topic/createServer 은 nodejs로 웹브라우저가 접속이 들어올떄마다 createserver 에 콜백함수를 노드 js 가 호출합니다.
// //request: 우리가 요청한 값ㅇ도, response 는 응답할 떄, 우리가 웹브라우저 한테 전송할 모델을 담는다.
// var app = http.createServer(function(request, response) {
//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var title = queryData.id;
//     // console.log(url.parse(_url, true));
//     // console.log(url.parse(_url, true).pathname);
//     var html = ``;
//     var description = ""; //query string 에 따라 다른 정보를 출력해주는 웹 사이트를 만듦
//     var pathname = url.parse(_url, true).pathname;
//     if (pathname === "/") {
//         if (queryData.id === undefined) {
//             fs.readdir("./data", (error, files) => {
//                 var list = template.list(files);

//                 title = "welcome!";
//                 description = "Hello, node.js";
//                 html = template.html(
//                     title,
//                     list,
//                     `<h2>${title}</h2>  ${description}`,
//                     false
//                 );
//                 response.writeHead(200);
//                 response.end(html);
//             });
//         } else {
//             fs.readdir("./data", (error, files) => {
//                 list = template.list(files);
//                 var filteredId = path.parse(queryData.id).base;
//                 // 외부에서 정보가 들어오는 경우 1. readFile  (입력정보에 대한 보안)
//                 fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
//                     html = template.html(
//                         title,
//                         list,
//                         `<h2>${title}</h2>  ${description}`,
//                         true
//                     );

//                     response.writeHead(200);
//                     response.end(html);
//                 });
//             });
//         }
//     } else if (pathname === "/topic/create") {
//         fs.readdir("./data", (error, files) => {
//             var list = template.list(files);
//             title = "web - create!";
//             description = `<form action="/topic/create_process" method="post">
//             <p><input type="text" name="title" placeholder="title"></p>
//             <p>
//                 <textarea name="description" placeholder="description"></textarea>
//             </p>

//             <p>
//                 <input type="submit">
//             </p>
//         </form>`;
//             html = template.html(
//                 title,
//                 list,
//                 `<h2>${title}</h2>  ${description}`,
//                 false
//             );
//             response.writeHead(200);
//             response.end(html);
//         });
//     } else if (pathname === "/topic/update") {
//         fs.readdir("./data", (err, files) => {
//             var filteredId = path.parse(queryData.id).base; // 상위폴더로 가서 경로를 해집고 다니는 것을 차단함.
//             fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
//                 title = queryData.id;
//                 var sanitizedTitle = sanitizeHtml(title);
//                 var sanitizedDescription = sanitizeHtml(description, {
//                     allowedTags: ["h1"],
//                 });
//                 list = template.list(files);
//                 html = template.html(
//                     title,
//                     list,
//                     `<form action="/topic/update_process" method="post">
//                     <p>
//                     <input type = 'hidden'  name='id'  value='${sanitizedTitle}'>
//                     </p>
//                     <p>
//                     <input type = 'text' name='title' value='${sanitizedTitle}' placeholder="title">
//                     </p>
//                     <p>
//                     <textarea    name="description"  placeholder="description">${sanitizedDescription}</textarea>
//                     </p>
//                     <p>
//                     <input type='submit'>
//                     </p>
//                     </form>
//                     `,
//                     true
//                 );

//                 response.writeHead(200);
//                 response.end(html);
//             });
//         });
//     } else if (pathname === "/topic/create_process") {
//         var body = "";
//         request.on("data", (data) => {
//             body += data;
//             if (body.length > 1e6) request.connection.destroy(); // => 용량이 너무 크면그냥 끊어버인다.// 복잡하게 할때 사용할 것
//         }); // 웹브라우저가 포스트 방식으로 데이터를 전송 할때, 데이터가 엄청 많으면 그 데이터를  처리하ㄴ다가 컴터가 꺼진다.
//         // 그래서 노드 js 는 이 포스팅 방식으로 전송되는 데이터가 많을 경우를 대비해서,  이런 사용방법을 제공하고 있다.
//         //  예로, 수신받아야 하른 ㄴ양이 100이면 , 그 중에서 조각조강의 양들을  수신 할떄마다 서버쪽에서 수신할 떄마다,
//         // 서버는 이 콜백 함수를 호출하도록 약속되어잇다. 그리고 호출 할 댸, 데이터라고 하는 인자를 통헤ㅔ, 수신한 정보를 주기로 약속 되어있다.
//         // 정보가 조각조각들어오다가 이제 들어올 정보가 없으며느 e nd  다음에  들어오는 요  콜백함수를 호출하게 되어있다.

//         // 정보 수신 끝나서 나오는 함구

//         request.on("end", (data) => {
//             var post = qs.parse(body);
//             var title = post.title;
//             var description = post.description;
//             fs.writeFile(`data/${title}`, description, "utf8", (err) => {
//                 // 200 : 성공했다! ok
//                 // 302 : 다른 페이지로 이동하자( 리다이렉션)
//                 response.writeHead(302, { Location: `/?id=${title}` }); // 리다이렉션 포맷
//                 response.end();
//             });
//         });
//     } else if (pathname === "/topic/update_process") {
//         var body = "";
//         request.on("data", (data) => {
//             body += data;
//             if (body.length > 1e6) request.connection.destroy(); // => 용량이 너무 크면그냥 끊어버인다.// 복잡하게 할때 사용할 것
//         });

//         request.on("end", (data) => {
//             var post = qs.parse(body);
//             var title = post.title;
//             var description = post.description;
//             var id = post.id;

//             fs.rename(`data/${id}`, `data/${title}`, (err) => {
//                 fs.writeFile(`data/${title}`, description, "utf8", (err) => {
//                     response.writeHead(302, { Location: `/?id=${title}` }); // 리다이렉션 포맷
//                     response.end();
//                 });
//             });
//         });
//     } else if (pathname === "/topic/delete_process") {
//         var body = "";
//         request.on("data", (data) => {
//             body += data;
//             if (body.length > 1e6) request.connection.destroy(); // => 용량이 너무 크면그냥 끊어버인다.// 복잡하게 할때 사용할 것
//         });

//         request.on("end", (data) => {
//             var post = qs.parse(body);

//             var id = post.id;
//             // 외부에서 오염된 정보가 들어오는 경우 ,외부에서 파일에 대한 접근이 가능한 경우 2번 . 삭제 unlink (입력정보에 대한 보안)
//             var filteredId = path.parse(id).base;
//             fs.unlink(`data/${filteredId}`, (err) => {
//                 response.writeHead(302, { Location: `/` }); // 리다이렉션 포맷
//                 response.end();
//             });
//         });
//     } else {
//         response.writeHead(404);
//         response.end("Not Found");
//     }

//     // 사용자가 접속한 url 에 따라서, 파일들을 읽어주는 코드 였슴
// });

// app.listen(3000);