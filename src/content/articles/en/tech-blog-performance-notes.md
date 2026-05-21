---
title: "What I Pay Attention to When Building a Fast Engineering Blog"
description: "A practical note on HTML, JavaScript, CSS, images, fonts, dependencies, Lighthouse metrics, and a checklist for keeping an engineering blog fast."
publishedAt: "2026-05-16 15:00"
tags: ["Astro", "Web Performance", "Lighthouse", "Engineering Blog"]
draft: false
---

## Introduction

On this blog, I try to keep the site lightweight, fast, and comfortable to read.

In this article, I will summarize the implementation details I pay attention to when building a fast engineering blog.

More specifically, I will cover the following topics:

- serving article content as static HTML
- keeping JavaScript away from the initial rendering path as much as possible
- treating CSS as part of the critical rendering path
- keeping images, icons, and Open Graph images lightweight
- avoiding unnecessary web fonts, especially for Japanese text
- keeping dependencies minimal
- how I look at Lighthouse measurements
- checking desktop and mobile results separately
- a checklist for keeping an engineering blog fast

This article is less about framework selection and more about practical implementation notes for keeping a blog lightweight.

The examples are based on a statically generated Astro blog, but many of the ideas also apply to blogs and documentation sites built with Next.js, Vite, or other frontend stacks.

## 1. Serve article content as static HTML

The most important thing for an engineering blog is that the article content should be readable as quickly as possible.

For that reason, I prefer generating article pages as static HTML at build time instead of assembling the content on the client side.

The basic idea is simple:

Markdown is converted into HTML during the build.  
The browser receives HTML that it can render immediately.  
The article content does not need to wait for JavaScript execution.

This makes the initial rendering path much simpler.

What I especially want to avoid is involving too much JavaScript in rendering the article body.

For example, the following patterns can make a blog unnecessarily complex:

- fetching article data on the client side
- parsing Markdown in the browser
- rendering the entire article body with React
- requiring routing or state management before the content appears

There are cases where these approaches make sense for web apps.

But an article page on an engineering blog is mostly for reading.  
If that is the case, serving the content as plain HTML is usually the fastest and most robust option.

## 2. Keep the HTML simple

Generating static HTML does not automatically mean the page is perfect.

If the HTML itself becomes too large, it can still affect the initial load.

Engineering blogs can easily accumulate a surprising amount of HTML:

- article content
- code blocks
- Open Graph metadata
- structured data
- alternate links for multiple languages
- common layout elements

So I try to keep the HTML reasonably small and simple.

The things I pay attention to include:

- avoiding unnecessary wrapper elements
- keeping shared components lightweight
- keeping metadata in the `head` necessary but not excessive
- avoiding oversized SEO or OGP metadata
- checking whether the article HTML size is unusually large

Shared layouts require extra care.

Headers, footers, SEO components, theme initialization, and navigation are included on many pages.  
If these common parts become heavy, every article page becomes heavy.

It is not enough to optimize only the article body.  
I also need to keep an eye on what is included in the shared layout.

## 3. Keep JavaScript away from the initial render

JavaScript needs to be handled carefully when thinking about performance.

Its cost is not just the file size.  
The browser also needs to parse, compile, and execute it. It can also block the main thread.

Even small features can add up on an engineering blog.

Examples include:

- theme switching
- copy buttons for code blocks
- sticky table of contents
- site search
- comments
- animations
- analytics
- external widgets
- syntax highlighting

These features can be useful, but if they are loaded everywhere, the site gradually becomes heavier than necessary.

Before adding JavaScript, I try to ask the following questions:

- Is this JavaScript really needed for the initial render?
- Can this be done with HTML and CSS?
- Does this need to be loaded on every page?
- Can the article still be read without this feature?
- Does this block the main thread?
- Can I remove this later without rewriting the whole site?

Astro makes it easy to add client-side interactivity only where needed.

But that does not mean I should turn every part of the article page into an interactive component.  
If I keep adding islands everywhere, the site will slowly move closer to a heavy frontend app.

For this blog, my default rule is simple:

The article body should not depend on JavaScript to appear.

Some small scripts may still be necessary, such as theme initialization.  
But even then, I try to keep them small and fast.

## 4. Treat CSS as part of the critical rendering path

CSS is not just for styling.  
It directly affects the initial rendering path.

CSS can block rendering.  
Even if the HTML has already arrived, the browser may wait for CSS before painting the page.

For that reason, I pay attention to the following:

- keeping shared CSS from growing too much
- avoiding loading homepage-only styles on article pages
- keeping layouts simple
- avoiding expensive visual effects
- not applying animations or transitions globally without thinking
- checking whether scrolling feels heavy on mobile

Some CSS properties can become expensive when used too much.

For example:

- `box-shadow`
- `filter`
- `backdrop-filter`
- `blur`
- large gradients
- complex sticky elements
- too many transitions
- scroll-linked animations

This does not mean I never use them.

But on an engineering blog, the main experience is reading.  
I do not want decorative effects to make scrolling or rendering feel heavy.

I also pay attention to how CSS is emitted during the build.

Inlining small CSS can reduce requests, but inlining too much CSS can become counterproductive.  
So I look at CSS not only as a styling layer, but as something that can affect rendering performance directly.

## 5. Keep images, icons, and OGP assets lightweight

Images can easily make a page heavy.

For a travel blog or a media site, images may be the main content.  
But for an engineering blog, the main content is usually text.

Images are sometimes necessary.  
Screenshots can make an article easier to understand.  
Icons and Open Graph images are also useful.

Still, images need to be handled carefully.

I try to follow these rules:

- avoid unnecessary hero images
- avoid decorative images that do not support the article
- crop screenshots to only the necessary area
- consider lightweight formats such as WebP or AVIF
- specify `width` and `height` to avoid layout shift
- avoid preloading too many images
- avoid oversized Open Graph images

`preload` is especially something I want to use carefully.

It can be useful, but if I preload too many things, it may compete with more important resources.

For an engineering blog, the highest priority is the article content.

I want the text to become readable before spending too much effort on loading decorative assets.

## 6. Use system fonts by default

Web fonts can make a site look polished.

However, Japanese web fonts can be large, and the loading cost can be significant.

For an engineering blog, I care more about readability and speed than strong visual branding.

That is why I usually prefer system fonts.

The benefits are straightforward:

- no additional font request
- faster text rendering
- a look that matches the operating system
- less risk of font loading flashes
- fewer layout shifts caused by font replacement

This does not mean web fonts are bad.

For brand sites or portfolios, typography can be a major part of the design.

But for a personal engineering blog, I prefer prioritizing readability, speed, and long-term maintainability.

## 7. Keep dependencies minimal

One of the most effective ways to keep a site fast is to avoid unnecessary dependencies.

Adding one library does not only add its own size.  
It can also add transitive dependencies, build complexity, update work, and security maintenance.

I am especially careful with dependencies that end up in the client-side bundle.

Before adding something like the following, I try to consider whether it is truly necessary:

- date formatting libraries
- animation libraries
- UI component libraries
- search libraries
- syntax highlighting
- Markdown extensions
- image galleries
- comment systems

For an engineering blog, simple date formatting or tag rendering can often be implemented without a large library.

Search and syntax highlighting can be useful, but they are not always needed from day one.  
If I add them, I want to make sure they do not affect the initial load of every page.

Keeping dependencies small helps not only performance, but also maintainability.

It is less about making the site smaller once, and more about reducing the number of ways the site can become heavy over time.

## 8. Serve the site as static assets

This blog is built and served as static assets.

The advantage of static delivery is that the server does not need to generate HTML for every request.

There is no database query.  
There is no API call.  
There is no per-user page rendering.

The server simply returns prebuilt HTML, CSS, JavaScript, and images.

This works very well for a personal engineering blog.

The benefits include:

- simple architecture
- fewer things that can break
- easy caching
- low operational cost
- smaller security surface
- less dependency on server-side response time

A web app may need dynamic rendering.

But for a blog whose main purpose is reading articles, static delivery is often the fastest and simplest option.

## 9. Look at real Lighthouse measurements

Lighthouse is very useful when thinking about performance.

However, I try not to look only at the total score.  
Instead, I look at each metric separately.

Here are some example measurements from this blog.

| Environment | FCP | LCP | TBT | CLS | Speed Index |
|---|---:|---:|---:|---:|---:|
| Mobile example 1 | 0.8s | 0.9s | 0ms | 0 | 0.8s |
| Desktop example 1 | 0.4s | 0.4s | 0ms | 0 | 0.5s |
| Mobile example 2 | 0.9s | 0.9s | 0ms | 0.001 | 2.2s |
| Desktop example 2 | 0.3s | 0.3s | 10ms | 0.001 | 0.3s |

FCP, LCP, TBT, and CLS are generally very good.

But the mobile Speed Index sometimes fluctuates more than expected.

This is important.

Even if LCP is fast, it does not always mean the entire visual loading experience is equally stable.

Lighthouse results can vary between runs.  
Network conditions, CPU performance, rendering timing, images, CSS, and other factors can affect the result.

So I try not to judge performance based on a single run.  
I prefer running it multiple times and looking at the overall tendency.

## 10. Target numbers for a lightweight engineering blog

This is only my personal reference, but I think a statically generated engineering blog can aim for fairly aggressive numbers.

After thinking through the numbers with ChatGPT, I use something like the following as a rough guideline.

| Metric | Theoretical value | Practical target | Acceptable range |
|---|---:|---:|---:|
| FCP | 0.2–0.5s | 0.5–1.0s | under 1.5s |
| LCP | 0.3–0.8s | 0.8–1.5s | under 2.0s |
| TBT | 0ms | 0–50ms | under 100ms |
| CLS | 0 | 0–0.01 | under 0.05 |
| Speed Index | 0.3–0.8s | 0.8–1.5s | under 2.5s |

These numbers assume a very lightweight site.

They would be too strict for many other types of sites, such as:

- media sites with many ads
- travel blogs where images are the main content
- e-commerce sites
- dashboards
- authenticated web apps
- sites with many third-party scripts
- sites using multiple web fonts

These targets make sense only because this blog is mostly static HTML with minimal images and JavaScript.

## 11. Desktop and mobile are different

A site that feels fast on desktop does not automatically feel fast on mobile.

I noticed this clearly while measuring this blog.

On desktop, FCP and LCP can be around 0.3 to 0.4 seconds.  
But on mobile, the same page can sometimes show a Speed Index above 2 seconds.

There are many possible reasons:

- different CPU performance
- different network conditions
- different viewport size
- different CSS application timing
- different font rendering behavior
- different image handling
- stricter Lighthouse mobile conditions

During development, it is easy to check everything only on a desktop machine.

But many readers may open the article on a phone.

So I try not to call the site fast just because the desktop score looks good.

At minimum, I check both Mobile and Desktop in Lighthouse.  
When possible, I also check the site on a real device or with DevTools Performance.

## 12. Do not optimize only for numbers

Lighthouse is useful, but optimizing only for Lighthouse can be misleading.

At first, I cared a lot about improving FCP, LCP, TBT, and CLS.

Those metrics are important for the initial load.  
But a site experience cannot be explained by one score.

Performance should be viewed from multiple angles:

- initial load
- scrolling
- response to taps and clicks
- mobile experience
- desktop experience
- consistency across multiple measurements
- total resource size
- main thread work

This article focuses mainly on the initial loading path.

But when improving a real site, I think it is important to check both metrics and actual feel.

Numbers are useful because they reveal problems.  
But the final goal is not a perfect score.

The final goal is a site that feels fast and comfortable to read.

## 13. Checklist for keeping an engineering blog fast

Here is the checklist I use to keep a technical blog lightweight.

### HTML

- [ ] Article content is generated as HTML at build time
- [ ] Article content is not generated by client-side JavaScript
- [ ] There are no unnecessary wrapper elements
- [ ] Shared layouts are not too heavy
- [ ] Metadata in the `head` is not excessive
- [ ] OGP, canonical, and hreflang tags are necessary and sufficient
- [ ] HTML size is not unusually large

### JavaScript

- [ ] Unnecessary JavaScript is not loaded during the initial render
- [ ] Article pages do not casually introduce React hydration
- [ ] Article content is readable without JavaScript
- [ ] Small necessary scripts, such as theme initialization, stay small
- [ ] Third-party scripts are minimized
- [ ] Features such as copy buttons, search, and sticky TOC are evaluated before adding
- [ ] DevTools does not show long main-thread blocking tasks

### CSS

- [ ] Shared CSS is not bloated
- [ ] Article pages do not load unnecessary homepage styles
- [ ] CSS is treated as a render-blocking resource
- [ ] `box-shadow`, `filter`, `backdrop-filter`, and `blur` are not overused
- [ ] Animations and transitions are not applied globally without reason
- [ ] Sticky elements and heavy decoration do not make scrolling feel slow
- [ ] Mobile scrolling feels smooth

### Images and icons

- [ ] Unnecessary hero images are avoided
- [ ] Images use lightweight formats such as WebP or AVIF when appropriate
- [ ] Images have explicit `width` and `height`
- [ ] Screenshots are cropped to the necessary area
- [ ] Too many images are not preloaded
- [ ] Favicons, icons, and Open Graph images are not excessive
- [ ] Images do not take priority over article content

### Fonts

- [ ] Japanese web fonts are not loaded casually
- [ ] System fonts are considered first
- [ ] Font loading delays are checked
- [ ] Layout shifts caused by font replacement are checked

### Dependencies

- [ ] A library is added only when it is truly necessary
- [ ] Dependencies that enter the client-side bundle are reviewed carefully
- [ ] Simple tasks such as date formatting and tag rendering are not over-engineered
- [ ] Search features are evaluated for index size and JavaScript size
- [ ] Syntax highlighting does not add unnecessary cost to every page
- [ ] Unused dependencies are removed

### Delivery and build

- [ ] The site can be served as static files
- [ ] Initial rendering does not depend on a database or API
- [ ] Prebuilt HTML, CSS, JavaScript, and images are served directly
- [ ] The file structure is cache-friendly
- [ ] Build output size is checked after deployment
- [ ] CI checks build, lint, and typecheck

### Measurement

- [ ] Lighthouse is checked for both Mobile and Desktop
- [ ] FCP, LCP, TBT, CLS, and Speed Index are reviewed separately
- [ ] A single Lighthouse run is not treated as the final truth
- [ ] Network requests and transfer sizes are checked
- [ ] Coverage is used to find unused CSS and JavaScript
- [ ] Performance is used to inspect main-thread work
- [ ] Mobile scrolling is checked on a real or simulated device
- [ ] Desktop speed alone is not considered enough
- [ ] The site is not judged only by Lighthouse scores

## Conclusion

Building a fast engineering blog is not about adding one magic setting.

It is mostly about avoiding small, unnecessary costs.

Serve article content as static HTML.  
Keep JavaScript away from the initial rendering path.  
Treat CSS as part of the critical rendering path.  
Handle images and fonts carefully.  
Avoid unnecessary dependencies.  
Measure both desktop and mobile.  

These small decisions add up.

At the same time, numbers are not everything.

A good Lighthouse score is useful, but the real goal is not the score itself.  
The goal is to make the blog feel fast, stable, and comfortable to read.

I want to keep improving this blog while maintaining that balance.

---

**Update (2026-05-21):** After publishing this article, I added syntax highlighting to this blog using Shiki. The reasoning behind the decision — including how I thought about the trade-off between readability and keeping the site lightweight — is covered in [Why I Added Syntax Highlighting with Shiki to My Fast Tech Blog](/en/articles/add-shiki-syntax-highlight/).