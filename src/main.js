const { createPosts, generatePosts } = require("./modules/post");
const { generatePage } = require("./modules/page");

const posts = createPosts();
generatePosts(posts);

generatePage("index", {
    title: "Home",
    posts,
});
generatePage("about");
generatePage("contact");
