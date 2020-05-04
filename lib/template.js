module.exports = {
    html: (title, list, body, control) => {
        if (control === true) {
            controller = `<a href="/create">create</a> \
          <a href="/update?id=${title}">update</a>  \
        <form            action ="delete_process"     method="post"      > \
        <input type='hidden' name='id' value ='${title}'> \
        <button type="submit">delete</button></form>`;
        } else {
            controller = `<a href="/create">create</a>`;
        }
        return `
                <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
                ${list}
                ${controller}
             ${body}
            </body>
            </html>
            `;
    },

    list: (files) => {
        var list = `<ul>`;
        var i = 0;
        while (i < files.length) {
            list = list + `<li><a href="/?id=${files[i]}">${files[i]}</a></li>`;
            i = i + 1;
        }
        list = list + `</ul>`;
        return list;
    },
};

// module.exports = template;