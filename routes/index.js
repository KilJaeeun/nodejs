const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");

router.get("/", (request, response) => {
    title = "welcome!";
    description = "Hello, node.js";
    list = template.list(request.list);
    html = template.html(
        title,
        list,
        `<h2>${title}</h2>   <img style="width:400px; display:block; margin: 15px 0px" src="/images/1.jpg"> ${description}`,
        false
    );
    response.send(html);
});
module.exports = router;