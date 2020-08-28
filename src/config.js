const { join } = require("path");

module.exports = {
    blog: {
        title: "Node SGG",
        description:
            "I'm a self taught Fullstack developer, I build things with code, mainly with Javascript/Typescript, ReactJS, NodeJS, and GraphQL",
    },

    author: {
        name: "Muco Tresor",
    },

    postsDirectory: join(process.cwd(), "./src/content"),
    pagesDirectory: join(process.cwd(), "./src/pages"),
    buildDirectory: join(process.cwd(), "./public"),
};
