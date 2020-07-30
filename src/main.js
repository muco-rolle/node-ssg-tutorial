const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const marked = require("marked");

const markdownFile = join(process.cwd(), "src/post-test.md");
const markdownContent = readFileSync(markdownFile, "utf8");

const htmlContent = marked(markdownContent);

const htmlFile = markdownFile.slice(0, -3) + ".html";

const response = writeFileSync(htmlFile, htmlContent);
console.log(response);
