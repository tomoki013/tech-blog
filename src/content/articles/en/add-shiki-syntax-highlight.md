---
title: "Why I Added Syntax Highlighting with Shiki to My Fast Tech Blog"
description: "A short note on why I introduced syntax highlighting with Shiki to my Astro-based tech blog, and how I balanced performance, readability, and maintainability."
publishedAt: "2026-05-21 16:30"
tags: [ "Astro", "Shiki", "Web", "Performance", "Tech Blog"]
draft: false
---

## Introduction

This blog is built with a focus on being lightweight, fast, and easy to read.

The basic policy is simple: render article content as static HTML and avoid unnecessary JavaScript during the initial page load. Whenever I add visual details or features, I try to ask whether they are truly necessary for the reading experience.

With that in mind, I decided to introduce syntax highlighting using Shiki.

## Why I Added Syntax Highlighting

At first, I was not sure whether syntax highlighting was necessary.

Since this blog is designed to be fast, I did not want to add a library just because it seemed convenient. For short code snippets, plain text can be enough.

However, code and configuration files are unavoidable in a tech blog. Articles about Astro, TypeScript, CSS, Cloudflare Workers, GitHub Actions, and similar topics often include multi-line code examples or configuration snippets.

When those code blocks are displayed in a single color, they become harder to scan. Keywords, strings, comments, and properties are less distinguishable, which makes the code feel heavier to read than the surrounding text.

In a tech blog, code is not just a supplement to the article. It is an important part of understanding the topic. For that reason, I decided that minimal syntax highlighting was worth adding for readability.

## Why I Chose Shiki

There are several options for syntax highlighting, such as Prism.js and highlight.js. If the only goal were to keep things small, those could also be reasonable choices.

Still, I chose Shiki this time.

The main reason is that Shiki fits well with a build-time highlighting approach.

This blog does not assemble article content on the client side. Markdown is converted to HTML at build time, and the browser receives mostly finished HTML. Shiki works naturally with this approach.

Instead of parsing and highlighting code in the browser, Shiki can generate pre-highlighted HTML ahead of time. That means readers do not need to run extra JavaScript just for syntax highlighting after opening an article.

For this blog, the requirement was clear: make code easier to read without increasing the client-side runtime cost. Shiki matched that requirement well.

## Why I Did Not Build My Own Highlighter

I also considered building a very small syntax highlighter myself.

For example, if I only needed to support TypeScript and JSON, it might look possible to use regular expressions to color keywords and strings.

But that approach quickly reaches its limits.

Once JavaScript, TypeScript, CSS, HTML, JSON, YAML, Shell, and other formats are involved, language-specific syntax differences become hard to ignore. Comments, strings, template literals, nesting, escaping, attributes, and configuration-specific formats all need to be handled carefully.

A half-finished custom highlighter may look lightweight at first, but it can become expensive to maintain. Every small rendering issue would need manual fixes, and I could end up spending more time adjusting the highlighter than writing articles.

The goal of this blog is not to build every mechanism from scratch. It is to keep learning and development notes readable. From that perspective, leaving syntax parsing to Shiki was the more natural choice.

## How I Think About Adding Dependencies

I try not to add dependencies to this blog too casually.

Adding a library does not only affect bundle size. It also brings maintenance work, updates, configuration, compatibility concerns, and security checks. Client-side dependencies in particular should be handled carefully.

However, avoiding dependencies completely is not the goal. Rebuilding necessary functionality by hand and reducing quality or maintainability would be missing the point.

In this case, Shiki had a clear reason to exist.

- It improves the readability of code in technical articles.
- It avoids running syntax highlighting logic in the browser.
- It provides a familiar look close to VS Code.
- It offers better parsing accuracy and maintainability than a custom implementation.
- It works well with Astro and a static site architecture.

Given these points, I felt that adding this dependency was justified.

## What I Kept in Mind During Implementation

Adding Shiki does not mean I want to make the blog unnecessarily rich.

This blog should remain static and lightweight. So I use syntax highlighting with the following principles in mind:

- Do not run syntax highlighting JavaScript after the article loads.
- Focus on the languages that are actually needed.
- Avoid excessive themes and decorations.
- Prioritize readability in code block design.
- Do not sacrifice the overall page performance.

The important part is not simply using Shiki. The important part is making code easier to read while keeping the blog fast and lightweight.

## Conclusion

Adding features to a fast tech blog is harder than it may seem.

If performance were the only goal, the fastest option would be to add nothing. But if that makes technical articles harder to read, the blog becomes less useful.

I introduced Shiki not to make the design look fancy, but to make code feel natural to read without increasing the client-side runtime cost.

Fast, lightweight, and readable.

I want to keep choosing only what is necessary while maintaining that balance.
