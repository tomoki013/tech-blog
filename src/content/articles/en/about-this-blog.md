---
title: "About This Blog: Why I Rebuilt a Blazing-Fast Engineering Blog"
description: "Why I rebuilt Tomokichi's Engineering Growth Log from Next.js to Astro, how I chose the stack, and what I want to write about here."
publishedAt: "2026-05-11 15:30"
updatedAt: "2026-05-12 11:35"
tags: ["Astro", "Cloudflare", "Engineering Blog", "Indie Development"]
draft: false
---

## About This Blog: Why I Rebuilt a Blazing-Fast Engineering Blog

This blog is my personal engineering blog for recording what I learn, build, break, rethink, and improve as a developer.

The name is **Tomokichi's Engineering Growth Log**.

This blog is not completely new.

It originally existed as a technical blog built with Next.js.

However, the previous version used too many animations and included many features that were not really necessary for a personal engineering blog. As a result, it became heavier than it needed to be.

There is nothing wrong with caring about design or motion.

But when I thought about the purpose of this site as a place for reading technical articles, I started to wonder whether all of those features were really necessary.

Another trigger was the repeated need to deal with React Server Components-related security issues.

This does not mean that Next.js is bad.

For a web application, Next.js is extremely useful.

But for a personal engineering blog that is not updated every day and does not need authentication, billing, a database, or many APIs, I started to question whether I really needed to keep using Next.js.

So instead of slightly modifying the old blog, I decided to rethink the entire technical stack and rebuild it.

## Why I Rebuilt It

I have built several blogs and web services so far.

Through my travel blog, **Tomokichi's Travel Diary**, I learned how difficult it is to write articles, think about SEO, and operate a website over a long period of time.

Through my AI itinerary generation service, **Tabidea**, I have worked with more practical web application topics such as Next.js, Supabase, Cloud Run, the Gemini API, the Google Maps API, Stripe, CI/CD, RLS, authentication, billing, and performance.

As I kept building things, I kept learning more.

But those learnings often ended up scattered across daily conversations, notes, GitHub issues, and prompts for AI coding agents.

Recently, I have been thinking not only about implementation itself, but also about questions like:

- Why did I choose this technology?
- Why did I design it this way?
- How much should I delegate to AI coding agents?
- Where should humans still make the final decision?
- How much maintainability and security should a small indie project care about?

I wanted a proper place to write down those thoughts.

That is why I decided not just to keep the old blog alive, but to rebuild it in a way that fits my current thinking.

## The Previous Version Used Next.js

The previous version of Tomokichi's Engineering Growth Log was built with Next.js.

Next.js is a very powerful framework.

It includes routing, image optimization, API Routes, Server Components, dynamic rendering, authentication patterns, data fetching, caching strategies, and many other features for building modern web applications.

For a web application like Tabidea, Next.js is a great fit.

But this blog needs very little.

I basically need to write articles in Markdown, convert them to HTML at build time, and serve them quickly from Cloudflare.

I do not need authentication.

I do not need billing.

I do not need a database.

I barely need APIs.

This is not a media site that gets updated many times a day.

With that in mind, Next.js started to feel too large for this blog.

Of course, it is possible to build a static blog with Next.js.

But because Next.js can do so many things, it is also easy to gradually make the design more application-like than necessary.

That is exactly what happened with my previous blog.

I added too many animations and features, and the site became heavier than a technical blog needed to be.

So I started to think that it would be better to choose a stack that is centered on content delivery from the beginning.

That led me to consider alternatives to Next.js.

## Vite + React Was Also a Candidate

After reconsidering Next.js, the next candidate was **Vite + React**.

I had used Vite + React before, and I liked its lightweight development experience.

If I wanted to avoid a large framework and build only what I needed, Vite + React seemed like a reasonable choice.

However, once I thought about what a blog actually needs, I realized that I would have to build many things myself.

For example:

- Loading Markdown files
- Generating article lists
- Creating tag pages
- Supporting multiple languages
- Generating RSS
- Generating sitemap.xml
- Managing OGP metadata
- Designing article URLs
- Generating HTML at build time

Building screens with React is easy.

But building all the surrounding structure needed for a content-focused site would require a lot of custom work.

Also, if I chose Vite + React, I would naturally think of the site as a React application.

But what I wanted to build was not an interactive application experience.

I wanted fast, readable, reliable article delivery.

So Vite + React also felt slightly off for this particular use case.

## Other Options I Considered

Besides Next.js and Vite + React, I also considered a few other options around the React ecosystem.

One of them was **Remix**.

Remix has an attractive design philosophy based on web standards, routing, data loading, and form handling.

With the movement toward React Router v7, it is also a very interesting option for building React-based web applications.

However, what I wanted to build this time was not a web application.

It was a personal engineering blog with relatively infrequent updates.

I did not need forms, authentication, or dynamic data fetching.

So instead of using the strengths of Remix, I felt that a more content-focused stack would fit better.

**TanStack Router** and **TanStack Start** were also interesting options in the React ecosystem.

TanStack Router is appealing because of its type-safe routing.

TanStack Start is also interesting as a full-stack React framework built on top of Vite and TanStack Router.

But this blog does not need advanced routing or full-stack features.

I just need to write articles, convert them to HTML at build time, and serve them quickly from Cloudflare.

So TanStack's ecosystem also felt a bit too application-oriented for this blog.

There are also options like **Nuxt** in the Vue ecosystem and **SvelteKit** in the Svelte ecosystem.

However, I have mainly worked with React and TypeScript so far.

I did not have a strong reason to move to Vue or Svelte just for this blog.

There are also web frameworks in other languages, such as Ruby on Rails, Django, and Laravel, but since I have mostly worked in TypeScript and have little experience with those backend frameworks, they were not realistic candidates for this project.

In the end, what I needed was not a full-stack web application framework.

I needed a system that could handle Markdown articles well, serve static HTML quickly, and allow small extensions only when necessary.

Astro fit that requirement best.

## Why I Chose Astro

The final choice was **Astro**.

This was my first time adopting Astro.

I was not familiar with it from the beginning.

Even so, Astro felt like the best fit for this blog.

The reason is simple.

Astro is well suited for content-focused websites.

Writing Markdown, converting it to HTML at build time, and generating static pages is very close to what I wanted to do.

The biggest reasons were:

- It works well with Markdown
- Astro Content Collections make article management easier
- It naturally generates static HTML
- It makes it easier to avoid unnecessary JavaScript
- Interactive parts can be added only where needed
- It is suitable for multilingual site design
- It works well with Cloudflare Workers Static Assets
- It is harder for AI coding agents to accidentally push the site toward an overly complex architecture

This blog does not parse Markdown in the browser.

Markdown is converted to HTML at build time.

When a reader opens an article, they receive already generated HTML.

This makes the initial page load easier to keep light, and it allows the article to remain readable without relying on JavaScript.

## Tech Stack

This blog is designed to be simple, fast, and maintainable.

The main stack is:

- Astro
- Markdown
- Astro Content Collections
- TypeScript
- Tailwind CSS v4
- Biome
- pnpm
- Cloudflare Workers Static Assets
- GitHub Actions

I do not use React or MDX for this site.

The priority is to make the site readable with HTML and CSS first.

JavaScript is added only where it is actually needed.

## Page Design Philosophy

The most important idea behind this blog is to deliver articles as straightforward HTML.

Article pages are basically generated as static HTML.

CSS is used to make them readable, and JavaScript is added only when necessary.

In particular, I care about the following principles:

- Convert article content to HTML at build time
- Do not assemble article content on the client side
- Keep articles readable even without JavaScript
- Use JavaScript only for necessary features
- Avoid adding external scripts or web fonts casually
- Serve pages as quickly as possible from Cloudflare
- Prioritize speed and maintainability over adding more features

In the future, I may use CSS View Transitions or Astro's ClientRouter to improve the perceived speed of page transitions.

Even then, the core idea should remain the same: the article content itself should still be delivered as static HTML.

Even if I add smoother transitions, I do not want the pages themselves to become unnecessarily heavy.

## Features I May Add, and Features I Probably Won't

This blog intentionally keeps its feature set small.

The main features I may add in the future are:

- Search
- Syntax highlighting

As the number of articles grows, search may become useful.

Since this is a technical blog, syntax highlighting will probably become useful once I write more articles with code.

On the other hand, I do not plan to add many other large features.

For example:

- Comments
- User accounts
- A CMS
- A database
- APIs
- Heavy animations
- Complex permanent interactions

These do not feel necessary for this blog.

That said, this does not mean that I reject images or animations themselves.

If a diagram, screenshot, or comparison image helps explain an article, I will use it.

I may also use lightweight animation where it makes sense.

What I want to avoid is adding permanent features or heavy decorative effects that are not necessary for reading articles.

The previous version of the blog went a little too far in that direction.

This time, I want the site to stay focused on reading.

## Multilingual Support

This blog uses Japanese as the default language, but it also provides English versions of articles.

Japanese articles use the normal URL structure, while English articles live under `/en/`.

For example, this article would use the following URLs:

- `/articles/about-this-blog/`
- `/en/articles/about-this-blog/`

I am not adding English versions only to reach readers outside Japan.

A lot of technical information is written in English, and I think being able to explain my own design decisions and implementation ideas in English is important for an engineer.

Also, as I work more with AI coding agents, the ability to organize design intent in English will probably become more useful.

I want this blog to be a place where I practice explaining in English what I first thought through in Japanese.

## Built with AI Coding Agents in Mind

This blog is also designed with AI coding agents in mind.

Recently, I have been using tools such as Claude Code, Codex, and Gemini CLI more often in my development workflow.

However, the more I delegate to AI, the more important it becomes to clearly define the design philosophy and constraints.

For this site, I have decided things like:

- Do not introduce React
- Do not use MDX
- Do not render articles on the client side
- Do not add APIs or a database
- Do not add unnecessary permanent features
- Keep the site readable as fast static HTML first

These constraints are not just restrictions.

They help prevent AI agents from adding too many convenient-looking features and pushing the site away from its original direction.

AI coding agents can speed up implementation a lot.

But if the goal and constraints are vague, the architecture can easily become more complicated than necessary.

That is why I think humans still need to decide what not to build, and how much responsibility the site should actually have.

## What I Want to Write About

I plan to write mainly about the following topics.

### Indie Development Design and Thinking

I want to write about how I design personal projects like Tabidea, where I struggled, and why I chose certain technologies.

I do not want to write only step-by-step tutorials.

I also want to record the reasoning behind my decisions.

### Development with AI Coding Agents

I want to write about how I use Claude Code, Codex, Gemini CLI, and similar tools.

This includes workflows, strengths and weaknesses, failure cases, how to write instructions, and how to review AI-generated code.

In an era where AI writes code, I want to clarify what humans should still think about.

### Web App Infrastructure and Operations

I also want to write about infrastructure and deployment tools used in indie development, such as Cloud Run, Cloudflare, Vercel, Netlify, Supabase, and GitHub Actions.

I especially want to focus on realistic low-cost setups for students and indie developers.

### Frontend and UX

I will write about Next.js, Astro, Tailwind CSS, performance, error pages, waiting-time UX, multilingual support, dark mode, and other topics related to user experience.

Instead of saying "it is impressive because it uses AI," I want to think about how to build experiences that are actually useful.

### Security and Maintenance

I also want to write about security and maintenance topics that even small indie projects cannot ignore, such as Supabase RLS, authentication, cookies, OAuth, secret management, and CI checks.

Even small projects have lines they should not cross.

### Learning and Career

I started with basic HTML and CSS, then moved on to JavaScript, Next.js, personal blogs, AI applications, and cloud deployment little by little.

I want to write about what I learned through that process, and what I am thinking about as I work toward becoming an engineer.

## What I Care About

What I care about most in this blog is not presenting perfect answers.

Instead, I want to record:

- What I was unsure about
- What failed
- How my thinking changed later
- What worked well when I delegated to AI
- What became risky when I delegated to AI
- Moments when I realized design mattered more than implementation

Technical articles often make us want to present only clean conclusions.

But real development involves a lot of messy decisions.

Reconsidering a blog built with Next.js because of RSC-related security work.

Considering Vite + React.

Thinking about other React ecosystem options such as Remix and TanStack.

Then deciding that Astro fits this use case best.

That entire decision-making process is also part of what I learned.

I want this blog to record that process, not just the final answer.

## Closing

This blog is not just a modified version of the old Next.js blog.

I stopped, reconsidered what a personal engineering blog really needs, and rebuilt it with Astro.

I do not intend to turn it into a large media site from the beginning.

For now, I want it to be a quiet place where I steadily accumulate what I learn, think, build, and fail at.

Fast, lightweight, readable, and maintainable.

I hope that when I look back later, this blog will show the traces of my growth as an engineer.