---
title: "Before Calling It \"AI Optimization\": Why I Added llms.txt and WebMCP to My Engineering Blog"
description: "There is no settled answer yet for what an LLM- or agent-friendly web should look like, so I added llms.txt, llms-full.txt, and WebMCP to this blog as an experiment. Less a bet on future ranking gains than a small test of giving non-human readers an easier way in — here is what I built and why."
publishedAt: "2026-06-07 14:00"
tags: ["AI", "WebMCP", "llms.txt", "Astro", "Engineering Blog"]
draft: false
projectIds: ["tech-blog"]
---

Lately, across search, browsers, and developer tools, there are more and more moments where AI reads information from a website or acts on a user's behalf.

Along with that, terms like "LLMO," "AI search optimization," and "AI agent support" have started showing up everywhere.

But right now, I don't think it's settled what you should implement to be valued by AI, which specifications will see wide adoption, or whether there's even a shared, correct answer that deserves to be called "optimization."

So when I added `llms.txt`, `llms-full.txt`, and WebMCP to this blog, it wasn't because I believed "adding this makes you strong in AI search."

It was because **as the chance that non-humans read a website grows, I wanted to provide an entry point — separate from the HTML — that makes the content easy to hand to a machine.**

This post walks through what I implemented, and why I tried these mechanisms first, even though their effect and their future are far from decided.

## The human-facing screen and the content itself can be considered separately

A normal web page is built on the assumption that a human reads it in a browser.

Beyond the article body, it includes a header, navigation, a table of contents, share buttons, related articles, a profile, a footer, and many other elements.

Those are UI a human needs, but for a program or AI that only wants the article's content, not all of them are necessarily required.

Of course, today's AI can extract the body from HTML. So it isn't that the content can't be read unless I provide a Markdown version.

Still, handing over Markdown that already contains the title, metadata, and body from the start is simpler than making something parse the HTML and guess "where does the body begin and end."

This blog's articles are managed in Markdown to begin with.

So generating HTML for humans while also returning Markdown or JSON close to the original structure when needed was relatively natural to implement.

Rather than rebuilding the human-facing UI into something for AI, it's closer to the idea of **providing multiple representations of the same content.**

## What I implemented this time

The main additions were these three.

* `llms.txt`, a guide to the whole site
* `llms-full.txt`, which bundles every article
* A WebMCP tool that returns the Markdown of the article currently open

Each plays a slightly different role.

## llms.txt is less an AI-only sitemap than a "guide board"

On this blog, I placed [`/llms.txt`](/llms.txt) at the root.

In addition to the site name and description, it includes the following.

* A list of Japanese articles
* A list of English articles
* The Markdown-version URL of each article
* Main pages such as Home, About, Works, and Archive
* The Japanese and English RSS feeds
* A link to `llms-full.txt`

The mental image is less a sitemap that mechanically lists every URL on the site, and more a **guide board that shows what exists here and which information is a good place to start.**

```txt
# Tomokichi's Engineer Growth Log

> A personal engineering blog for logging learning, building, failures, and improvements.

## Articles (Japanese)

- [Article title](https://example.com/articles/example.md): Article description

## Pages

- [About](https://example.com/about/): Author profile and focus areas.
```

If I updated the article list by hand, I might forget to update `llms.txt` every time I publish.

So I fetch published articles from Astro's Content Collections and generate the list at build time.

```ts
const articles = await getArticlesWithPaths(locale);

return articles
  .map(
    ({ article, slug }) =>
      `- [${article.data.title}](${articleMarkdownUrl(locale, slug)}): ${article.data.description}`,
  )
  .join("\n");
```

The article titles and descriptions reference the same frontmatter as the normal article pages.

That way, instead of separately maintaining information just for AI, it's **generated from the same source as the human-facing pages.**

That said, `llms.txt` is one of the formats currently being proposed, and it doesn't guarantee that every AI service will read it.

At least for now, rather than "a file that increases AI traffic just by placing it," I think of it as an optional entry point a machine can use when it wants to grasp the site's structure.

## llms-full.txt bundles the Markdown of published articles

[`/llms-full.txt`](/llms-full.txt) concatenates the published Japanese and English articles as raw Markdown.

```ts
const body = articles
  .map(({ article, slug }) => buildArticleMarkdown(article, locale, slug).trim())
  .join("\n\n---\n\n");
```

If `llms.txt` is an index of links to articles, then `llms-full.txt` is the file that bundles the bodies as well.

This format isn't strictly necessary.

In fact, as the number of articles grows, the file could become too large to handle comfortably. In the future, splitting it by category or language might be better.

Even so, at the current stage where there aren't many articles yet, it's usable when you want to check the whole site's content at once.

Here too, the goal isn't to raise search rankings, but to **add one more form that's easy for whoever needs it to handle.**

## Each article is also available as Markdown and JSON

So that `llms.txt` can reference them, each article has a Markdown version separate from the HTML one.

For example, if a normal article URL looks like this,

```txt
/articles/example/
```

the Markdown version can be retrieved at this URL.

```txt
/articles/example.md
```

The article page's `head` also lists the Markdown and JSON versions as alternate representations.

```html
<link rel="alternate" type="text/markdown" href="..." />
<link rel="alternate" type="application/json" href="..." />
```

This isn't a feature only for AI.

It's also useful for people who want to copy the Markdown directly, who want to load it into another tool, or for programs that want to handle the metadata as JSON.

Rather than closing it off as an "AI feature," I think it's more natural to see it as **a general output format that makes content easier to reuse.**

## With WebMCP, I exposed only a tool to fetch the current article

WebMCP is a draft specification for a web page to expose structured tools in the browser so that a supporting AI agent can call them.

On this blog, when an article page opens, I register a tool called `get_current_article_markdown`.

Its only role is to return the Markdown of the article currently displayed.

Simplified, the implementation looks like this.

```ts
const modelContext = document.modelContext;

modelContext.registerTool({
  name: "get_current_article_markdown",
  description: "Return the full Markdown source of the article currently open in this tab.",
  inputSchema: {
    type: "object",
    properties: {},
    additionalProperties: false,
  },
  annotations: {
    readOnlyHint: true,
  },
  async execute() {
    const response = await fetch(markdownUrl);
    const text = await response.text();

    return {
      content: [{ type: "text", text }],
    };
  },
});
```

Exposing multiple tools for search, posting, or editing is conceivable, but this time I didn't go that far.

For now, I implemented only a low-impact tool that:

* requires no input
* changes no state on the server
* handles no personal information
* only reads an already-published article

I also set `readOnlyHint: true` to indicate that this tool is read-only.

And in browsers where the WebMCP API doesn't exist, it simply does nothing and exits.

```ts
if (!modelContext || !root) return;
```

So even in unsupported environments, normal article reading is unaffected.

To keep an old article's tool from lingering across Astro's page transitions, I also deregister it with an `AbortController` before leaving the page, and register it again on the next page.

In this way, I don't make WebMCP a premise of the site, but treat it as **a progressive feature that's added only in environments where it can be used.**

## Why implement it when adoption isn't decided yet

Honestly, I don't know how far `llms.txt` or WebMCP will spread from here.

The specifications might change, and another approach might become the mainstream.

Even so, there were roughly four reasons I implemented them.

### 1. Because web users aren't necessarily only humans anymore

In web development so far, it was mostly enough to think about humans viewing pages in a browser.

But now, beyond search engines, AI assistants, browser agents, and developer tools also retrieve information on the web more and more.

I can't assert what the future shape will be, but I thought it was worth considering whether it's enough for a website to offer only a human-facing screen.

### 2. Because the source data is Markdown, so I could try it at low cost

This blog is structured to convert Markdown into HTML with Astro.

So there was no need to rebuild the content from scratch for machines.

From the same Markdown I can generate HTML, Markdown, JSON, and `llms.txt`, and WebMCP can return that Markdown too.

Being able to try this using the existing content model, without adding a large system, suited a personal blog well.

### 3. Because I'd rather implement and observe than predict the effect

When thinking about a new technology, one option is to respond after it becomes popular.

On the other hand, if it can be implemented in a small way, there's often more to learn from actually touching it.

* What kind of information should be structured
* How to avoid duplicating information with human-facing pages
* Whether the design can stay easy to follow as the spec changes
* How to separate read-only from state-changing operations

These are easier to think about concretely once you've implemented it than by only reading about it.

This effort is less a bet on the future than **a small experiment for understanding the change.**

### 4. Because I could make it easy to remove later

When trying a new specification, I think ease of removal matters as much as ease of adoption.

This implementation doesn't replace the existing article display or URL structure.

`llms.txt` and `llms-full.txt` are additional outputs, and WebMCP only runs when the API exists.

Even if it ends up unused, the impact on normal blog functionality is small.

Precisely because it's a technology whose adoption I can't read, I tried it as a loosely coupled add-on rather than placing it at the center.

## This isn't a story about "LLMO is now handled"

Calling this implementation "LLMO measures" or "AI search optimization" feels slightly off to me.

The very scope that "LLMO" refers to isn't fixed, and how AI services discover, retrieve, and use a website in their answers differs from service to service.

Placing `llms.txt` doesn't guarantee that AI will cite you in its answers.

Implementing WebMCP doesn't mean common browsers or AI agents can use it right away either.

At the moment, neither promises a widely established result.

So on this blog, rather than "optimized for AI," I think it's more accurate to say

**I experimentally prepared a machine-readable path that AI or programs can use when retrieving the content.**

## llms.txt is not a substitute for robots.txt or a usage license

Another thing I want to be careful about is that `llms.txt` is not an access-control mechanism.

It differs in role both from something like `robots.txt` that tells crawlers an access policy, and from a license that defines content copyright or terms for AI-training use.

This blog's `llms.txt` is there to guide what the site contains and which formats are easy to retrieve.

Questions of what may be crawled and how articles may be used need to be considered separately through robots.txt, terms of use, licenses, and each service's behavior.

By its name alone it might look like a file that states every AI-related policy, but at least in this implementation I treat it as **a guide to already-published information, not something that grants permissions.**

## If WebMCP changes state, the story changes a lot

The WebMCP tool I exposed this time only returns an article's Markdown, so what it can do is limited.

But if WebMCP handles form submission, purchases, reservations, posting, or settings changes, simply registering a tool is not enough.

Just like a normal web UI, or even more so, you need to think about:

* authentication and authorization
* input validation
* protection against CSRF and malicious requests
* confirmation for important operations
* preventing double execution
* rate limiting
* operation logging
* keeping the tool's description and its actual behavior in agreement

Just because an AI agent is the caller doesn't make it a trusted client.

This time I limited it to a feature that only reads public content. Even if I add tools later, I want to avoid exposing state changes just because they seem convenient, and instead consider the boundaries the same way I would in normal API design.

## What I want to check going forward

At the point of implementing it, this isn't "done" yet.

Going forward, I want to check things like:

* whether access to `llms.txt` or the Markdown versions actually happens
* whether `llms-full.txt` becomes too large as the number of articles grows
* whether I can follow WebMCP spec changes without strain
* how far support spreads on the browser and agent side
* whether the machine-facing explanations contradict the human-facing ones

That said, even if there are records in the access logs, I can't necessarily tell precisely whether the use is by AI, or just a check or a crawler.

Even if I can get numbers, I think I need to observe over the long term rather than immediately tying them to an effect.

## Closing

This time, I implemented `llms.txt`, `llms-full.txt`, and WebMCP on this engineering blog.

But this isn't an assertion that "from now on, this approach will be the correct answer."

The shape of AI search and an agent-friendly web is still in the middle of changing.

That's exactly why, instead of deciding the future and building heavily, I added an entry point that makes information easier to hand to machines as well, within a range that doesn't break the existing human-facing experience.

Some people read HTML.
Some people want to use Markdown directly.
Sometimes a program retrieves JSON.
And in the future, an AI agent in the browser might use WebMCP's tools.

I can't predict all of that from now.

Even so, I think a design that separates content from presentation and can safely offer the same information in multiple forms has meaning regardless of the AI trend.

This implementation isn't a tactic for conquering an unknown ranking.

**It's a small experiment for thinking about a web where humans aren't necessarily the only users.**

## References

* [The /llms.txt file](https://llmstxt.org/)
* [WebMCP Draft Community Group Report](https://webmachinelearning.github.io/webmcp/)
* [WebMCP is available for early preview](https://developer.chrome.com/blog/webmcp-epp)
