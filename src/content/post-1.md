---
title: "Learn to Think Like a Programmer"
publishedAt: "2020-08-02"
summary: "If you ask me a question, and I don't know the answer, I'm gonna tell you that I don't know. But I bet you what. I know how to find the answer, and I will find the answer."
---

If you've ever watched a movie called [The Pursuit of Happyness](https://en.wikipedia.org/wiki/The_Pursuit_of_Happyness) you can remember a scene where Chris Gardner(Will Smith) was in a job interview, and he says this:

> I'm the type of person, if you ask me a question, and I don't know the answer, I'm gonna tell you that I don't know. But I bet you what. I know how to find the answer, and I will find the answer.

Now you can ask me how does that relate to thinking like a programmer? Yes, it does, this is the mindset every professional programmer should have, amateurs programmers pretend to have the knowledge they don't possess while professional programmers aren't afraid to admit whey they are wrong or don't know, and we have also two important things: **have a question(problem)** and **find the answer(solution)**. I'm sure you can agree with me that that's what programmers are dealing with every day, find solutions for problems. In this article, we're going to focus on how to find the solution for a problem you don't know in the first place.

Actually programmers have different approaches when it comes to solving problems, but most of the programmers I talk to usually take the following steps to solve problems:

<!-- It can be easy to bring out an application or a solution of a problem you've already worked on, but what if you don't know the solution? what if you're stuck? how do you get yourself out of that chaos? yeah I know it can be easy to find a tutorial online or someone else's solution, but I don't think that's a the first route to take. Steve Jobs once said:

> Everyone in this country should learn to program a computer, because it teaches you to think.

When you try to understand the meaning of that quote, it means that there's a way programmers think therefore think about problems, and especially how to find solutions. Now the question is which approach programmers take to think about problems and come up with solutions. -->

1. Understand the problem they need to solve.
2. Break the problem down into smaller problems.
3. Solve each small problem.
4. Assemble the solutions into the final solution.

I don't think it's enough to give you the steps only, let's take a concrete example and go through all of those 4 steps by building a simple application.

Recently I was tasked to write documentation for an API, and we realize that soon we gonna need to customize the tool I was using to write the documentation, I started to think about how I will do that, actually, the tool I was using is built on the same principles as the one I built on this blog, it is a Static Site Generator, I got the idea to build a small version of it, and then by that I will have some understanding of how the tool is working, but I didn't have any clue of how I can do it. Let's use the steps above and see how we can build something we don't know the solution in the first place. I know that it's not an innovative solution but it is a good example to show you how you can tackle any problem you don't know the solution and find it.

Before we dive into building this let's first talk about prerequisites, which you need to follow this tutorial comfortably.

I'm gonna use Node.js to build this application, so you must-have basics of it and Javascript as well. If you have experience with another programming language you can follow along, Javascript is not hard you can understand most of the code we gonna write, or you can implement the fixtures we build here into the language you're comfortable with. Let's start with the first step.

## Understand the problem.

Understing the problem will help you to solve it faster. Actually, most problems are hard because you don't understand them, one of the mistakes you can make as a programmer is to rush into writing code without understanding what problem you are trying to solve, I can relate too, writing code is fun but if you skip this step most of the times you'll find yourself stuck looking at a blank file without knowing what to do next. Here we're going simple, but this process can take much time depending on the complexity of the problem, so please do yourself a favor to spend some time analyzing and make sure to understand the problem you have, it would even require to go through a brainstorming session.

For us we already know the problem we want to solve, we want to build a simple static site generator which will help us to write a blog post in markdown, and convert it into HTML so we can easily display it in our website later.

## Break the problem down into smaller problems

When you do know the problem and understand it, it can be easier to solve it, but if it is complex and bigger, trying to solve it in one will make the process of solving it worse, so how can we do it? Desmond Tutu once wisely said:

> There is only one way to eat an elephant: a bite at a time.

This means that every problem that seems daunting, overwhelming, and even impossible can be accomplished gradually by taking on just a little at a time. Breaking large problems into smaller problems requires practice and patience, continue practicing you'll only get better.

The requirement for our project is to convert Markdown content to HTML. Here are the steps needed to fulfill it.

-   Get the content from a markdown down file
-   Convert markdown content to html
-   Add Markdown content to HTML file

<!-- I got the idea to built my little version of a static site generator, I want it to be simple enough, just be able to write posts in markdown and have them generate them into html files. -->

Great, we now have smaller problems, let's start by setting up the environment and then continue working on them. Make sure you have Node.js installed in your machine or go on the [official website](https://nodejs.org/en/) and download it, my favorite way to install Node.js is to use [NVM](https://github.com/nvm-sh/nvm).

I hope you have Node.js installed on your machine, so create a folder, name it `node-ssg`, or whatever you want, it doesn't matter.

When you install Node.js it comes with a package manager called [NPM](https://www.npmjs.com/) let's use it to initialize our project and later we gonna use it to install dependencies. Go in the folder you created, and in your terminal run the following command.

```shell:node-ssg
npm init -y
```

The command above creates a file called `package.json` it'll contain all information related to our projects, like the version of the application, dependencies, and more. For now, it contains the following content.

```json:node-ssg/package.json
{
    "name": "node-ssg",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}
```

In the same folder, for me is `node-ssg` create another folder and name it `src` I'm gonna use command line interface feel free to do so or use your graphical user interface.

```shell:node-ssg
mkdir src
```

And go in the `src` folder, create a file and name it `main.js` this file does not have a special meaning, you can name it whatever you want, like `index.js`.

```shell:node-ssg
cd src
```

```shell:node-ssg/src
touch main.js
```

Open it with your favorite code editor, and add the following content.

```js:node-ssg/src/main.js
console.log("Hello, World!!!");
```

In your terminal run the following command.

```shell:node-ssg/src
node main.js
```

You should see `Hello, World!!!` displayed in your terminal, great we have Node.js running. If you change something in `main.js`, to see the changes you made you have to run again the command above, that's repetitive let's automate that process by installing a package that will detect if there's a change in our files and will run the command above automatically for us. The package is called [nodemon](https://nodemon.io).

In your terminal run the following command to install it.

```shell:node-ssg
npm install nodemon --save-dev
```

Check your `package.json` file, you can see that we have nodemon installed, it is specified under _ devDependencies _ field.

```json:node-ssg/package.json
  "devDependencies": {
    "nodemon": "^2.0.4"
  },
```

Don't quit that file, in the `scripts` field we gonna add an **npm script** for nodemon, in Node.js we use npm scripts to automate repetitive tasks. You can learn more about the subject [here](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633).

```json:node-ssg/package.json
"scripts": {
    "dev": "nodemon ./src/main.js"
}
```

You can now use the script above to start Node.js in your terminal.

```shell:node-ssg
npm run dev
```

Now if you make changes in `node-ssg/src/main.js` you don't have to run `node main.js` command again. Good, let's start working on our problems.

## Solve each small problem.

Here we don't have many small problems, we going to solve them in order and we don't have to work on the fourth step If you broke down your problem into many small problems I recommend you start on the easier ones. It will help you to reason about the hard ones and find their solutions faster.

### Get the content from a markdown down file.

First things first, we need Markdown content, in `src` create a file, name it `post.md`, copy the content from [this link](https://raw.githubusercontent.com/muco-rolle/mucotresor.com/develop/src/pages/blog/teach-your-self-touch-typing.mdx) and then add it to the `post.md` the file you created in src.

Until now we should have a folder structure which looks like this:

```shell:node-ssg
├── package-lock.json
├── package.json
└── src
   ├── main.js
   └── post.md
```

Let's give our interest to the `main.js` file, open it we gonna start writing the actual code, to get the content from a file, in Node.js there's a built-in module, which can help us to deal with that. Take look at the code below.

```js:node-ssg/src/main.js
const { join } = require("path");
const { readFileSync } = require("fs");

const markdownFile = join(process.cwd(), "src/post.md");
const markdownContent = readFileSync(markdownFile, "utf8");

console.log(markdownContent);
```

In the first two lines, I imported two built-in modules, the first one is `path` which is a module provides utilities for working with file and directory paths, the second is `fs` which is a module provides an API for interacting with the file system.

<!-- In nodejs many functions which deals with tasks that can take long time will come in two version a Synchronous version and an Asynchronous version for now we're using a Synchronous version because we don't gonna suffer from performance issues, for Async version it should be `readFile` only. -->

The next line is for the file we're working with, I like to work with absolute paths instead of relatives paths, I have `join` function which joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path, the first parameter is a method `process.cwd()` which is giving me the current working directory, and the second is just the path for the actual file which contains Markdown content.

Next, we're using `readFileSync` function to get the content from the file(`post.md`) we gave it in the first parameter, and in the second parameter I'm specifying that I want the content to be encoded in [UTF-8](https://en.wikipedia.org/wiki/UTF-8), finally, I print the content. You can see the content of `post.md` in your terminal.

Good, now we have the content, this problem is solved, we can go on the next one.

### Convert markdown content to HTML.

<!-- We now have much down content it's time to convent them into html but you don't have to solve your problems in order you can start to the one which is easy and continously until you find complete all sub problems and assemble them into one big solution for the big problem. -->

How can we convert Markdown to HTML? I don't know either, it's time for a little research. In this situation, you have to find good solutions and choose one which integrates well in your workflow. I found a popular package on npm it is called `marked`, let's install it.

```shell:node-ssg
npm install marked
```

I hope on your side it has finished being installed, let's use it.

```js:node-ssg/src/main.js
const marked = require("marked");

const htmlContent = marked(markdownContent);
```

In the first line we just imported marked and the second line we're using the marked function to convert Markdown content and in result, it returns HTML content.

With our previous code we now have this:

```js{3,8,9}:node-ssg/src/main.js
const { join } = require("path");
const { readFileSync } = require("fs");
const marked = require("marked");

const markdownFile = join(process.cwd(), "src/post.md");
const markdownContent = readFileSync(markdownFile, "utf8");

const htmlContent = marked(markdownContent);
console.log(htmlContent);
```

### Add HTML content to html file

We now have HTML content, let's add it to the HTML file.

```js:node-ssg/src/main.js
const { writeFileSync } = require("fs");

const htmlFile = markdownFile.slice(0, -3) + ".html";

writeFileSync(htmlFile, htmlContent);
```

Here I'm importing `writeFileSync` function which is gonna help us to create the file and add the content to it, and then I took the markdown file, I removed the last 3 characters(**.md**) and replace it with **.html**, and finally, we use writeFileSync to create the file and add the content to it.

With our previous code, we now have this:

```js{2,10,11}:node-ssg/src/main.js
const { join } = require("path");
const { readFileSync, writeFileSync } = require("fs");
const marked = require("marked");

const markdownFile = join(process.cwd(), "src/post.md");

const markdownContent = readFileSync(markdownFile, "utf8");
const htmlContent = marked(markdownContent);

const htmlFile = markdownFile.slice(0, -3) + ".html";
writeFileSync(htmlFile, htmlContent);
```

Check now in the `src` folder you should see a `post.html` file.

You can immediately see that this project needs a lot of improvements, and you can add more features like:

-   Be able to write many posts and convert them in HTML without hard coding the files.

-   Make posts look better, we don't have CSS styles now.

-   As a programmer, you would write content that includes code snippets so to have syntax highlight in your content is good too.

-   If you want to make it more useful you can add also more pages like home, about, and contact.

There's a lot of features that can be added. In upcoming articles, I will add those features I listed above. In the meantime, you can add them on your own I'll be happy to see what you come up with. You can even go crazy and make it a complete Static site generator like Jekyll, Hugo, etc.

Thank you all, I hope you enjoyed reading this article. You can find the source code of this project on [GitHub](https://github.com/muco-rolle/node-ssg-tutorial/tree/v0.0.1).
