const { readFileSync } = require("fs");
const marked = require("marked");
const frontmatter = require("front-matter");

const parseMarkdown = (markdownFile, markdownContent) => {
    const data = frontmatter(markdownContent);

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function (code, language) {
            const hljs = require("highlight.js");
            const validLanguage = hljs.getLanguage(language)
                ? language
                : "plaintext";
            return hljs.highlight(validLanguage, code).value;
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
    });

    const post = {
        ...data,
        path: markdownFile.slice(0, -3) + ".html",
        body: marked(data.body),
    };

    return post;
};

const postTemplate = ({ title, summary, publishedAt, body }) => `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${summary}" />
    <link rel="stylesheet" href="assets/css/node-ssg.css">
	<title>${title}</title>
</head>

<body>
	<h1 className="post-title">${title}</h1>
	<p className="post-date">${publishedAt}</p>
	<div className="node-ssg">
		${body}  
	</div>
</body>
</html>
`;

module.exports = { parseMarkdown, postTemplate };
