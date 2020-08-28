const { join } = require("path");
const { renderFile } = require("pug");
const { writeFileSync } = require("fs");
const { pagesDirectory, buildDirectory } = require("../config");

const generatePage = (pageName, locals) => {
    const html = renderFile(join(pagesDirectory, pageName + ".pug"), locals);
    writeFileSync(join(buildDirectory, pageName + ".html"), html);
};

module.exports = { generatePage };
