const { join } = require("path");
const {
    readdirSync,
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync,
} = require("fs");
const { parseMarkdown, postTemplate } = require("./utils");
const { error } = require("console");

/*
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

  return post;
};


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
*/
const createPosts = (postsDirectory) => {
    const markdownFiles = readdirSync(postsDirectory);

    const htmlContents = markdownFiles.map((markdownFile) => {
        const markdownContent = readFileSync(
            join(postsDirectory, markdownFile),
            "utf8"
        );

        return parseMarkdown(markdownFile, markdownContent);
    });

    return htmlContents;
};

const generatePosts = (posts, buildDirectory) => {
    if (!existsSync(buildDirectory)) {
        mkdirSync(join(buildDirectory, "./blog"), { recursive: true });
    }

    posts.map(({ path, attributes, body }) => {
        const { title, summary, publishedAt } = attributes;
        const post = postTemplate({ title, summary, publishedAt, body });

        writeFileSync(join(buildDirectory, `./blog/${path}`), post, (error) => {
            if (error) throw error;

            console.log(`${path} was created successfully`);
        });
    });
};
module.exports = { createPosts, generatePosts };
