/*
const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const marked = require('marked');

const markdownFile = join(process.cwd(), 'src/post.md');

const markdownContent = readFileSync(markdownFile, 'utf8');
const htmlContent = marked(markdownContent);

const htmlFile = markdownFile.slice(0, -3) + '.html';
writeFileSync(htmlFile, htmlContent);
*/

const { join } = require("path");
const { generatePosts } = require("./modules/post");

const markdownFolder = join(process.cwd(), "src/content");
const htmlFolder = join(process.cwd(), "public/posts");

generatePosts(markdownFolder, htmlFolder);
