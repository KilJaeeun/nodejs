const express = require("express");
const router = express.Router();
var path = require("path");
const fs = require("fs");
const template = require("../lib/template.js");
var sanitizeHtml = require("sanitize-html");

/* CREATE FORM START */
router.get("/create", (request, response) => {
    var list = template.list(request.list);
    title = "web - create!";
    description = `<form action="/topic/create" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                    <textarea name="description" placeholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>`;
    html = template.html(title, list, `<h2>${title}</h2>  ${description}`, false);
    response.writeHead(200);
    response.end(html);
});
/* CREATE FORM end*/
/* CREATE process START */
router.post("/create", (request, response) => {
    var post = request.body; //미들웨어는body 라느느 객체를 가진다.
    var title = post.title;
    var description = post.description;
    fs.writeFile(`data/${title}`, description, "utf8", (err) => {
        response.redirect(`/topic/${title}`); // 리다이렉션 포맷
    });
});

router.get("/update/:pageId", (request, response) => {
    var filteredId = path.parse(request.params.pageId).base; // 상위폴더로 가서 경로를 해집고 다니는 것을 차단함.
    title = filteredId;
    var list = template.list(request.list);
    var sanitizedTitle = sanitizeHtml(title);
    var sanitizedDescription = sanitizeHtml(description, {
        allowedTags: ["h1"],
    });
    html = template.html(
        title,
        list,
        `<form action="" method="post">
                                    <p>
                                    <input type = 'hidden'  name='id'  value='${sanitizedTitle}'>
                                    </p>
                                    <p>
                                    <input type = 'text' name='title' value='${sanitizedTitle}' placeholder="title">
                                    </p>
                                    <p>
                                    <textarea    name="description"  placeholder="description">${sanitizedDescription}</textarea>
                                    </p>
                                    <p>
                                    <input type='submit'>
                                    </p>
                                    </form>
                                    `,
        true
    );

    response.writeHead(200);
    response.end(html);
});
router.post("/update/:pageId", (request, response) => {
    var post = request.body;
    var id = post.id;
    var title = post.title;
    var description = post.description;
    fs.rename(`data/${id}`, `data/${title}`, (err) => {
        fs.writeFile(`data/${title}`, description, "utf8", (err) => {
            response.redirect(`/topic/${title}`);
        });
    });
});

router.post("/delete", (request, response) => {
    var post = request.body;

    var id = post.id;
    // 외부에서 오염된 정보가 들어오는 경우 ,외부에서 파일에 대한 접근이 가능한 경우 2번 . 삭제 unlink (입력정보에 대한 보안)
    var filteredId = path.parse(id).base;
    fs.unlink(`data/${filteredId}`, (err) => {
        response.redirect("/");
    });
});

/* read START */
router.get("/:pageId", (request, response, next) => {
    var filteredId = path.parse(request.params.pageId).base;
    var title = request.params.pageId;
    // 외부에서 정보가 들어오는 경우 1. readFile  (입력정보에 대한 보안)
    fs.readFile(`data/${filteredId}`, "utf8", (err, description) => {
        if (err) {
            // 에러가 있다면,
            next(err);
        } else {
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
                allowedTags: ["h1"],
            });
            list = template.list(request.list);
            html = template.html(
                title,
                list,
                `  <h2>
                              ${sanitizedTitle}
                                </h2>
                                <p>
                              ${sanitizedDescription}
                                </p>
                                `,
                true
            );

            response.send(html);
        }
    });
});
/* read END */

// export
module.exports = router;