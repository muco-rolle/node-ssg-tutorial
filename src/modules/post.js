const { join } = require("path");
const { readdirSync, readFileSync, writeFileSync } = require("fs");
const marked = require("marked");
const frontmatter = require("front-matter");

const parseMarkdown = (markdownContent) => {
  const data = frontmatter(markdownContent);

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, language) {
      const hljs = require("highlight.js");
      const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
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
    body: marked(data.body),
  };

  console.log(post);
  return post;
};

/**
 * Configuratin and generating one post
 * @param {string} htmlFolder
 * @param {string} fileName
 * @param {string} htmlContent
 */
const generatePost = (htmlFolder, fileName, htmlContent) => {
  const { title, publishedAt, summary } = htmlContent.attributes;
  const { body } = htmlContent;

  post = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${summary}" />
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
  const htmlFile = join(htmlFolder, fileName + ".html");
  writeFileSync(htmlFile, post);
};

/**
 * Generate posts
 * @param {string} markdownFolder
 * @param {string} htmlFolder
 */
const generatePosts = (markdownFolder, htmlFolder) => {
  const markdownFiles = readdirSync(markdownFolder);

  const markdownContents = markdownFiles.map((markdownFile) => {
    return readFileSync(join(markdownFolder, markdownFile), "utf8");
  });

  const htmlContents = markdownContents.map((markdownContent) =>
    parseMarkdown(markdownContent)
  );

  markdownFiles
    .map((markdownFile) => markdownFile.slice(0, -3))
    .map((markdownFileName) => {
      htmlContents.map((htmlContent) =>
        generatePost(htmlFolder, markdownFileName, htmlContent)
      );
    });
};

module.exports = {
  generatePosts,
};
