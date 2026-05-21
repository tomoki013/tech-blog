---
title: "Lighthouse Scores Are Not the Same as Perceived Performance"
description: "What I learned after implementing CSS View Transitions on my static blog — how measured performance and perceived speed can tell very different stories."
publishedAt: "2026-05-16 17:00"
tags: ["performance", "frontend", "astro", "ux", "web"]
draft: true
---

## Introduction

Recently, I rebuilt my personal tech blog.

For this blog, I have been paying a lot of attention to performance.

I wanted it to be lightweight, fast, and free from unnecessary client-side JavaScript.  
That is why I chose Astro and built the blog as a mostly static website.

At first, I cared a lot about Lighthouse scores.

FCP, LCP, TBT, CLS, Speed Index.  
Seeing those numbers improve felt good, and it made performance improvements feel visible.

But while building the blog, my thinking started to change.

**A good Lighthouse score and a good user experience are not always the same thing.**

The moment that made this concrete for me was when I added SPA-style page transition animations to the blog.

In this article, I want to write about what that experience taught me — specifically, the gap between measured performance numbers and how fast a site actually feels.

## At first, I cared a lot about Lighthouse

When working on performance, Lighthouse is one of the easiest tools to start with.

It gives you a score.  
It shows metrics.  
It tells you what can be improved.

Especially in personal projects, it is easy to get lost and wonder what to improve first.  
In that sense, Lighthouse is very helpful.

I also started by looking at Lighthouse quite a lot.

- What is the Performance score?
- How fast is FCP?
- How fast is LCP?
- Is there any TBT?
- Is CLS close to zero?
- Is Speed Index acceptable?

I checked these numbers while reducing CSS, removing unnecessary JavaScript, and reviewing images and fonts.

That itself was not a bad thing.

In fact, Lighthouse was very useful for improving the initial page load.

But after a while, I started to feel that something was missing.

## Good scores, but not always a good feeling

The Lighthouse score was good.

The initial load was fast.  
LCP was fine.  
TBT was almost zero.  
CLS was not a problem.

But when I actually used the site, sometimes it did not feel as good as the numbers suggested.

For example:

- There was a slight delay after clicking a link.
- Page transitions felt too abrupt.
- Clicks did not always feel responsive.
- Going back and forward felt a little stiff.
- The numbers looked fast, but the experience did not always feel fast.

These things are hard to notice if you only look at Lighthouse.

Lighthouse is mainly useful for evaluating page load performance.  
It is especially helpful for understanding the first load.

But users do not only experience the first load.

They move from the article list to an article.  
They move from one article to another.  
They go back to the homepage.  
They open tag pages.  
They navigate around the site many times.

That kind of experience cannot be fully measured by Lighthouse alone.

## Initial load speed and page transition feel are different things

I think there are several kinds of “speed” on the web.

For example:

- How fast the first page appears
- How fast the main content becomes visible
- How quickly the site responds after a click
- How fast page transitions complete
- How smooth scrolling and interactions feel
- Whether the site feels pleasant to use

These are related, but they are not exactly the same.

Lighthouse is good at evaluating the initial loading experience.

And of course, that matters a lot.  
For a blog, many visitors come directly from search engines or social media, so the first page load should be fast.

But if you also care about visitors moving around inside the site, the first load is not enough.

Does the page transition feel good?  
Does the site respond immediately after a click?  
Does the screen change naturally?  
Does the transition interrupt the reading flow?

I started to feel that these things matter a lot too.

## MPA can be faster, but SPA can feel faster

This blog is basically built like an MPA.

Astro generates static HTML, and the site does not ship more client-side JavaScript than necessary.  
For a blog, I think this is a very natural architecture.

MPA is simple and strong.

Each page can be delivered as an independent HTML document.  
It is easier to make the first load fast.  
There is less dependency on JavaScript.  
It is more robust.  
It is also easier to handle SEO and accessibility.

For a personal blog, MPA is a very good fit.

On the other hand, SPA also has its own strengths.

The entire page does not reload during navigation.  
Only the necessary data or components are replaced.  
It is easier to give immediate feedback after clicking a link.  
It is also easier to add smooth transition animations.

As a result, even if the actual network or processing time is not always shorter, an SPA can sometimes **feel faster**.

I think this is an important point.

For example, even if an MPA is faster in raw numbers, users may feel a delay if the page suddenly turns blank before the next page appears.

On the other hand, in an SPA, even if some processing is happening in the background, the experience can feel faster if an animation starts immediately after a click and the screen changes smoothly.

In other words, there is **measured speed** and **perceived speed**.

These two are related, but they are not the same.

## I actually implemented CSS View Transitions

I added SPA-style page transitions to this blog to see what would happen.

The tools I used were Astro's `ClientRouter` and the browser-native View Transitions API.

`ClientRouter` is Astro's client-side router. It removes full-page reloads during navigation, giving the site SPA-like behavior. Combined with the View Transitions API, it makes it possible to animate elements between pages using nothing but CSS.

There were two main things I set up.

First, I assigned `view-transition-name` to the header, main content area, and footer.  
This tells the browser which elements to treat as distinct layers during a transition.

```css
.site-header { view-transition-name: site-header; }
.site-main   { view-transition-name: site-main; }
.site-footer { view-transition-name: site-footer; }
```

Second, I disabled animation on the header and footer — keeping them instant — and only animated the main content area.  
If the header fades in and out on every navigation, it becomes distracting. Animating only the content creates a natural sense of "the page changed" without the chrome feeling unstable.

```css
::view-transition-old(site-header),
::view-transition-new(site-header),
::view-transition-old(site-footer),
::view-transition-new(site-footer) {
  animation: none;
}
```

Before and after this implementation, I ran Lighthouse again.

The scores barely moved. Performance, FCP, LCP, TBT, CLS — the numbers looked the same.

But the experience of clicking a link felt noticeably different.

Before: click a link, the page flashes white, the next page appears.  
After: the content fades out, the next content fades in. The header stays exactly where it is throughout.

It was not that the site felt "faster" in a measurable sense.  
It felt more like the friction was gone.

That was the clearest example I found of the gap between measured performance and perceived speed.

Lighthouse had nothing to say about it. The improvement was real, but invisible to the tool.

## Animation is not the enemy

When working on performance, it is easy to think that animations should be removed because they can make a site heavier.

Of course, excessive animations are not good.

For example:

- Too many scroll-linked animations
- Heavy JavaScript calculations
- Animations that trigger layout recalculations
- Janky motion on low-end devices
- Animations that interrupt reading

These can make the experience worse.

But animation itself is not bad.

In fact, I think appropriate animation can improve perceived performance.

For example, animation can help when:

- The site responds immediately after a click
- A page transition feels natural
- The change on the screen has context
- The user does not lose track of where they are
- Waiting time feels less like waiting

If you only look at performance numbers, animation may look unnecessary.  
But from a UX perspective, it can sometimes be useful.

What matters is not whether to use animation or not.  
What matters is **why the animation exists**.

If it is only decoration, maybe it should be removed.  
But if it gives feedback or makes page transitions feel more natural, it may be worth the small cost.

## A fast site and a pleasant site are not exactly the same

While building this blog, I realized that a fast site and a pleasant site are not exactly the same.

A fast site can be measured to some extent.

Fast FCP.  
Fast LCP.  
Low TBT.  
No CLS.  
Small JavaScript.  
Light HTML.

These things are important.

But a pleasant site needs more than that.

It responds quickly when clicked.  
Transitions feel natural.  
Scrolling is smooth.  
The screen does not change in a confusing way.  
The reading experience is not interrupted.

These things do not always appear clearly in performance scores.

That is why I think performance work should not rely only on Lighthouse.  
Actually using the site is just as important.

Especially on mobile.

Tap links.  
Move between pages many times.  
Use the back button.  
Open an article from the article list.  
Finish reading one article and move to another.

By repeating these normal actions, you can find discomfort that numbers alone do not reveal.

It is a small and manual process, but I think it matters a lot.

## How far should a personal blog go?

That said, I do not think a personal blog should always become a rich SPA-like application.

A blog is mainly a place to read.

If the initial load becomes slower, JavaScript increases too much, or the site becomes fragile, that defeats the purpose.

So my current thinking is something like this:

- Make the initial load as static and fast as possible.
- Keep the basic architecture simple and MPA-like.
- Still care about page transition feel.
- Add lightweight animations when they improve UX.
- Use prefetch carefully and only where it makes sense.
- Bring in SPA-like behavior only where it is actually useful.

There is no need to make everything a SPA.

But just because a site is an MPA does not mean page transition UX should be ignored.

Even on a static blog, CSS View Transitions and limited prefetching can make the experience feel somewhat closer to an SPA.

What matters is not the technical category.  
What matters is how the site feels when people actually use it.

## Lighthouse is a starting point, not the goal

Lighthouse is useful.

I still trust it as an entry point for performance work.  
I will keep using it.

But I think it can be dangerous to treat the Lighthouse score itself as the final goal.

A site can have a good score but still feel unpleasant to use.  
You might remove useful feedback just to protect the score.  
You might focus only on the first load and forget about navigation and browsing experience.

That can happen.

So now I see Lighthouse as a starting point, not the goal.

First, use Lighthouse to find obvious problems.  
Then, actually use the site.  
Look at both numbers and experience.

I think that balance is important.

## Conclusion

While building my personal tech blog, I spent a lot of time thinking about performance.

At first, I mostly cared about improving Lighthouse scores.  
But as I built and used the site, I started to feel that page transition UX and interaction feedback are just as important.

Web performance is not only about numbers.

FCP, LCP, and other metrics are important.  
But how the site feels when users interact with it also matters.

I want this blog to be not only fast, but also pleasant to read.

I will keep improving it while balancing initial load performance and page transition experience.