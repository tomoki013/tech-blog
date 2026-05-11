---
title: "About This Blog: Why I Built a Fast, Minimal Engineering Blog"
description: "An introduction to Tomokichi's Engineering Growth Log: the technical choices, design philosophy, and the kinds of topics I plan to write about."
publishedAt: "2026-05-11"
updatedAt: "2026-05-11"
tags: ["Astro", "Cloudflare", "Engineering Blog", "Indie Development"]
draft: false
---

# About This Blog: Why I Built a Fast, Minimal Engineering Blog

This is a personal engineering blog for documenting what I learn, build, break, rethink, and improve as I grow as a developer.

The name of the site is **Tomokichi's Engineering Growth Log**.

I do not want this to be just a place for technical notes. I want it to become a place where I can record the reasoning behind my technical decisions, the architecture choices I make in my own projects, the lessons I learn from working with AI coding agents, and the process of becoming a better engineer over time.

## Why I Built This Blog

I have built and operated other websites before.

Through my travel blog, **Tomokichi's Travel Diary**, I learned how difficult it is to keep writing, think about SEO, manage content, and run a site over the long term.

Through **Tabidea**, an AI-powered itinerary generation service, I have been working with more practical web application topics such as Next.js, Supabase, Cloud Run, Gemini API, Google Maps API, Stripe, CI/CD, row-level security, authentication, billing, and performance.

However, many of these lessons tend to stay scattered across conversations, notes, GitHub issues, and prompts given to AI agents.

I created this blog so that I can organize those thoughts into proper articles and keep a visible record of my engineering growth.

## Technical Stack

This blog is designed to be simple, fast, and easy to maintain.

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

React and MDX are not part of the initial setup.

I think of this site not as a web application, but as a **static document delivery system**.

If the primary user action is simply reading an article, there is no need to ship heavy client-side JavaScript. Markdown is converted into HTML at build time, and the browser does not parse Markdown on the client side.

## Why Astro

At first, I considered building a custom static blog with Vite and React.

But what I wanted to build was not an application. It was a content-focused blog.

Astro made more sense for several reasons:

- It works naturally with Markdown
- It can generate static HTML by default
- It avoids unnecessary client-side JavaScript
- It makes multilingual routing easier to design
- It allows interactivity to be added only where needed
- It reduces the risk of accidentally turning the blog into a SPA when working with AI coding agents

The most important idea is: **do not over-applicationize a blog**.

It is possible to make page transitions feel like a SPA, or to render article content on the client side. But for a site built mainly for reading, that can easily become unnecessary complexity.

So this blog prioritizes fast, static, readable HTML first.

## Design and Feature Philosophy

The initial version intentionally keeps the feature set small.

The following features are not included at the beginning:

- Search
- Syntax highlighting
- Images inside articles
- Comments
- User accounts
- API routes
- Database
- CMS
- Web fonts
- Heavy animations

On the other hand, a few things are included from the start:

- Dark mode
- Japanese and English support
- RSS
- sitemap.xml
- robots.txt
- llms.txt
- Open Graph meta tags
- A shared Open Graph image

Search and syntax highlighting can be added later if the number of articles grows enough to justify them.

For now, I want the site to remain lightweight, fast, and hard to break.

## Multilingual Structure

This blog uses Japanese as the default language and also provides English pages.

Japanese pages live under the normal route, while English pages live under `/en/`.

For example, this article has the following paths:

- `/articles/about-this-blog/`
- `/en/articles/about-this-blog/`

I am not adding English pages only for external visibility.

A large amount of engineering knowledge is shared in English. Being able to explain my own ideas, technical decisions, and architecture in English is also part of becoming a better engineer.

As AI-assisted development becomes more common, I also think that the ability to clearly describe design intent in English will become increasingly useful.

## Built with AI Agents in Mind

This blog is also designed to be easy to maintain with AI coding agents.

Recently, I have been using tools such as Claude Code, Codex, and Gemini CLI in my development workflow.

The more I rely on AI agents, the more important it becomes to clearly define the design philosophy and constraints of a project.

For this site, I intentionally decided that the initial version should:

- Not introduce React
- Not use MDX
- Not render articles on the client side
- Not add images or search too early
- Keep the site fast as static HTML first

These constraints are not just limitations. They are guardrails.

They help prevent AI agents from adding convenient features too early and drifting away from the original goal of the site.

## What I Plan to Write About

I plan to write about topics like the following.

## Architecture and Thinking Behind Indie Projects

I want to write about the decisions behind my own projects, including services like Tabidea.

Not just what I implemented, but why I chose a particular design, what I was unsure about, and what trade-offs I considered.

## Development with AI Coding Agents

I will write about how I use tools such as Claude Code, Codex, and Gemini CLI.

This includes their strengths, weaknesses, failure cases, how I write instructions for them, and how I review their output.

As AI writes more code, I think the human role in design, review, and judgment becomes even more important.

## Web App Infrastructure and Operations

I plan to write about infrastructure and deployment topics such as Cloud Run, Cloudflare, Vercel, Netlify, Supabase, and GitHub Actions.

I am especially interested in realistic infrastructure choices for indie developers and students: free tiers, low-cost deployments, and simple but reliable operations.

## Frontend and User Experience

I will also write about frontend topics such as Next.js, Astro, Tailwind CSS, performance, error pages, waiting-time UX, multilingual sites, and dark mode.

I do not want to write only about using AI for the sake of using AI. I want to think about how to build experiences that are actually useful and pleasant.

## Security and Maintainability

Even small personal projects need security and maintainability.

I plan to write about topics such as Supabase RLS, authentication, cookies, OAuth, secret management, and CI checks.

Small projects do not need enterprise-level complexity, but I still believe they need a clear baseline.

## Learning and Career Growth

I started with the basics of HTML and CSS, then moved through JavaScript, Next.js, personal blogs, AI applications, and cloud deployments.

I want to write about what I learn through that process, and also about how I think about growing into an engineer professionally.

## What I Want to Value

This blog is not meant to show only polished conclusions.

I want to keep a record of things like:

- What I was unsure about
- What failed
- Where my thinking changed
- When AI agents helped
- When AI agents became risky
- When I realized design mattered more than implementation

Technical articles often present clean conclusions.

But real development is usually much messier.

I want this blog to preserve some of that process too.

## Closing

This blog is just getting started.

I am not trying to turn it into a large media site from day one.

For now, I want it to be a quiet place where I can keep adding what I learn, what I build, what I question, and what I improve.

If I can look back later and see a clear record of my growth as an engineer, this blog will have done its job.