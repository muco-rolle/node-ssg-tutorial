const { postsDirectory, buildDirectory } = require("./config");
const { createPosts, generatePosts } = require("./modules/post");
const { generatePage } = require("./modules/page");

const posts = createPosts(postsDirectory);
generatePosts(posts, buildDirectory);

generatePage("home");
generatePage("about");
