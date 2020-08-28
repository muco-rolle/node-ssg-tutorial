const { postsDirectory, buildDirectory } = require("./config");
const { createPosts, generatePosts } = require("./modules/post");

const posts = createPosts(postsDirectory);

generatePosts(posts, buildDirectory);

// createHomePage(posts);
// createAboutPage();
