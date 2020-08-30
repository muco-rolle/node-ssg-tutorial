const { join } = require("path");
const {
    readdirSync,
    readFileSync,
    writeFileSync,
    existsSync,
    mkdirSync,
} = require("fs");
const { parseMarkdown, postTemplate } = require("./utils");
const { postsDirectory, buildDirectory } = require("../config");

const createPosts = () => {
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

const generatePosts = (posts) => {
    if (!existsSync(buildDirectory)) {
        mkdirSync(join(buildDirectory, "./blog"), { recursive: true });
    }

    posts.map(({ path, attributes, body }) => {
        const { title, summary, publishedAt } = attributes;
        const post = postTemplate({ title, summary, publishedAt, body });

        writeFileSync(join(buildDirectory, `./blog/${path}`), post);
    });
};
module.exports = { createPosts, generatePosts };
