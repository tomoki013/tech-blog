---
title: "Why I Rebuilt My Tech Blog for Blazing Speed"
description: "From Next.js to Astro. A deep dive into the technical selection, the development process with AI agents, and my vision for this blog."
publishedAt: "2026-05-11 15:30"
updatedAt: "2026-05-13 15:00"
tags: ["Astro", "Cloudflare", "TechBlog", "IndieDev"]
draft: false
---

## Why I Rebuilt My Tech Blog for Blazing Speed

This blog, **"Tomokichi's Engineering Log,"** is a place where I document my learning, development, failures, and improvements as an engineer.

Actually, this isn't a brand-new start. This blog originally existed as a Next.js site. However, I decided to overhaul it completely, starting from the tech stack. This wasn't a random whim, but a result of "lessons learned" through my experience in indie development.

### Why the Rebuild Was Necessary Now
The main reason was that my previous blog had become "over-engineered" for its purpose, losing sight of what a technical blog should be.

*   **Excessive Features & Effects**: The previous version relied heavily on animations for visual impact. However, for readers looking for information, these became mere noise. I realized a tech blog should, first and foremost, deliver content instantly.
*   **Increasing Maintenance Overhead**: With constant updates and security patches required for React Server Components (RSC), I found myself spending more time maintaining the system than writing articles.
*   **Questioning "Right Tool for the Job"**: Next.js is a powerhouse for web apps. But for a static blog with no DB, no Auth, and moderate updates, did I really need such a massive framework? This rebuild is my answer to that question.

Drawing from my experience managing SEO for travel blogs and building full-stack apps like **Tabidea** (an AI travel planner), I redefined what I truly needed: a high-performance space to organize and share my thoughts.

## Behind the Tech Stack: Why Astro?

I explored several modern alternatives, but ultimately settled on **Astro**. Getting here involved some internal debate.

### Other Frameworks Considered
*   **Vite + React**: The development experience is incredibly snappy. However, when considering the manual effort of handling Markdown parsing, RSS feeds, sitemaps, and content management, Astro’s specialized content-centric features offered a clear advantage.
*   **Remix / TanStack (Router/Start)**: I love the "Web Standards" approach and type-safe routing. But for a site without form actions or dynamic data fetching, these felt like overkill.
*   **Vue (Nuxt) / SvelteKit**: Excellent ecosystems, but to maximize development speed by leveraging my existing React/TypeScript expertise, I decided to stick with the tools I know best.

### The Deciding Factor: Island Architecture
Astro is built for content-heavy sites. Its ability to convert Markdown into pure HTML at build time—shipping zero unnecessary JavaScript to the client—was a perfect match. 

In particular, **Astro Content Collections** provides a type-safe environment for managing articles, which acts as a powerful "guardrail" when developing alongside AI agents.

## Technical Architecture & Design Philosophy

To ensure long-term, low-maintenance, and high-speed operation, I kept the stack simple and modern:

*   **Core**: Astro (Intentional exclusion of React/MDX for the blog body)
*   **Styling**: Tailwind CSS v4
*   **Tooling**: TypeScript, Biome, pnpm
*   **Infrastructure**: Cloudflare Workers Static Assets + GitHub Actions

### A Commitment to "Static First"
My priority is ensuring the site is readable with just static HTML and CSS.
*   Article bodies are fully converted to HTML during the build process, making them accessible even in JS-disabled environments.
*   I minimize client-side hydration to keep Lighthouse scores near 100 at all times.
*   For internationalization (i18n), I avoided complex libraries in favor of a clean, directory-based design.

## Co-creating with AI Agents
A unique aspect of this rebuild is the development process. I now develop with coding agents like Claude Code and Gemini CLI as my constant partners.

In an era where we delegate implementation to AI, it’s crucial for the human developer to articulate **"Design Philosophy and Constraints."**

I explicitly set these constraints for this project:
1.  **"No React in the content layer."**
2.  **"No client-side dynamic rendering for articles."**
3.  **"No unnecessary external scripts."**

By hardcoding these constraints into my prompts and documentation, I prevent the AI from over-complicating the architecture. AI speeds up the implementation, but the human's role is to protect the "purity" of the site.

## Why I Publish in Both Japanese and English
This blog features an English version under the `/en/` path. This is about more than just reach.

The primary source of technical information is almost always English. Being able to explain my thoughts and implementations in English is not just about career options—it’s about sharpening my own clarity of thought. Translating my Japanese thoughts into English is a core part of my growth as an engineer.

## What to Expect Moving Forward

I don't intend to just post "perfect" answers here. Instead, I want to document the messy, real-world trial and error of modern development:

*   **Indie Dev Strategy**: Decision-making and technical debt battles from projects like Tabidea.
*   **Collaborating with AI**: Practical methods for prompting, reviewing, and building products with AI.
*   **Infra & Ops**: Tips for building robust, low-cost systems using Cloud Run, Cloudflare, etc.
*   **Frontend UX**: Balancing "usability" and "speed" without just following trends.
*   **Security & Maintenance**: Best practices for Auth and secret management in small-scale projects.

## Closing Thoughts
This blog is the result of pausing to ask, "What tools do I actually need?" 

I'm not aiming to build a massive media outlet from day one. I want to quietly but passionately stack up the small wins and painful failures I encounter. I hope that when I look back in a few years, I’ll see a clear line representing my growth as an engineer.

Fast, light, and readable.
Welcome to the new "Tomokichi's Engineering Log."