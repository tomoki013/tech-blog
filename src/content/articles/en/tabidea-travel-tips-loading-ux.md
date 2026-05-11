---
title: "Adding Travel Tips to the Loading Time of an AI Travel Planner"
description: "How I designed the generation waiting experience in Tabidea, an AI travel planner, by turning loading time into a moment of anticipation with a progress bar and travel tips."
publishedAt: "2026-05-11 19:00"
tags: ["AI", "UX", "Indie Development", "Travel", "Tabidea"]
draft: false
---

When building an app that uses AI, there is one problem that is almost impossible to avoid: **generation time**.

If the app only needs to return a short chat-style response, the wait may not be too noticeable. But when an app generates a more complete result, users may have to wait several seconds, ten seconds, or sometimes even longer.

I am currently building **Tabidea**, an AI travel planner. It is a web app that creates travel itineraries based on the destination, number of days, preferences, and other conditions entered by the user.

[Tabidea](https://tabide.ai)

The frontend is built with **Next.js / React / TypeScript**. For itinerary generation, I use the **Gemini API**. After generating an itinerary, I also plan to combine it with external APIs such as the **Google Maps API** to supplement spot information and improve the realism of routes and travel times.

For authentication and user data, I use **Supabase**.

In other words, Tabidea is not just an app that sends a prompt to an LLM and displays the returned text. It is a web app that combines AI generation, external APIs, user state, and UI presentation.

At first, I thought that if I passed the user’s conditions to the AI, it would return a reasonably good itinerary. But once I actually started building the product, I realized that a travel planner cannot stop at simply generating text.

To make an itinerary usable, the app needs to consider things like:

* whether a place actually exists
* whether the distance between spots is realistic
* whether the travel time is reasonable
* whether opening hours or closed days conflict with the plan
* whether the flow from morning to afternoon to evening feels natural
* whether the itinerary matches the user’s preferences

In other words, travel itinerary generation does not end with “returning text that looks plausible.” The AI’s suggestions need to be compared against real-world movement and spot information so that the final itinerary feels as natural as possible.

As a result, generation takes time.

In this article, I will write about how I thought about the waiting experience while building an AI travel planner. In the end, I arrived at a UI that shows **a progress bar and travel tips**, instead of relying only on a loading spinner.

## The waiting problem in AI apps

In AI apps, there is almost always a delay between the moment the user submits input and the moment the result is displayed.

Regular web apps also have waiting time, such as database reads or external API requests. But AI generation feels a little different.

With a database or a normal API, the requested data and processing are usually somewhat predictable. With AI generation, however, the output length and processing time can vary depending on the user input. From the user’s perspective, it is often hard to tell **what is happening right now**.

After pressing a button, the screen may look frozen. Several seconds may pass without any visible change. Then the user starts wondering:

* Is it actually working?
* Did an error happen?
* Should I press the button again?
* How long do I need to wait?

This is especially difficult because Tabidea is a **web app**.

Compared with mobile apps, I feel that users tend to leave web apps more easily when there is waiting time. In a mobile app, users may be more willing to interpret a short pause as “the app is processing something.” On the web, even a small delay in rendering or navigation can quickly feel like the page is heavy or broken.

Web apps also make it very easy for users to reload the page. If they feel uncertain, they may press the reload button, go back, or move to another tab.

Technically, it can also be tricky to decide where to keep the generation state. If the state only exists on the client side, it disappears when the user reloads. On the other hand, turning everything into a server-side job with full progress tracking can significantly increase implementation complexity, especially for an indie project.

That is why I felt it was important to first create a screen where users can wait without feeling anxious.

Even if the final generated result is good, users may leave before they ever see it if the waiting experience is bad. In AI apps, the experience during generation is very important.

## Streaming is the typical solution

One of the most common solutions to waiting time in AI apps is **streaming**.

This is the kind of UI used by ChatGPT, where the response appears gradually as it is generated. Streaming has major benefits.

First, users can see that generation is progressing. Because the result appears little by little, the feeling of simply waiting is greatly reduced.

Second, users can start reading before the entire generation is complete. For text-generation apps, streaming is an excellent fit.

However, for the travel planner I am building, I felt that directly using streaming would be difficult.

## Why streaming is hard for a travel planner

In a travel planner, showing partially generated information to users can be risky.

For example, suppose the AI first outputs “Visit spot A on the morning of Day 1.” Later checks may reveal that:

* spot A does not actually exist
* spot A is not open at that time
* moving from spot A to the next spot B is unrealistic
* another spot would make more sense than A

A travel itinerary is not just text. It is a connected structure made of order, movement, and time allocation. Content shown halfway through generation may change later.

Technically, the itinerary data Tabidea wants to handle is not just a long block of text. It is **structured data** with days, time slots, spots, descriptions, and movement information. Even if tokens stream in little by little, that does not mean they can be directly displayed in the UI.

Showing partial JSON or unverified spot names could make the experience more confusing. If a spot appears at first and then disappears later, or if the order changes after the user has already seen it, the user may wonder what the earlier output meant.

For travel planning, “plausible” is not enough. Place names and tourist attractions are especially sensitive. Suggesting a non-existent place would be a serious failure. Even when the place exists, an itinerary is not useful if the movement for the day is unrealistic.

For that reason, I decided that in Tabidea it would be more natural to check and organize the generated content before showing the itinerary as a complete result, rather than streaming the AI output directly.

## Itinerary generation is not just waiting for the AI response

The reason a travel planner takes time is not only that the app is waiting for the AI.

In Tabidea, I do not want to display the LLM’s itinerary draft exactly as it is. Instead, I want to combine it with external APIs and application-side logic where needed, then turn it into a form that can be shown to users.

That means the waiting time includes not only “the AI thinking,” but also “the app checking and formatting the result.”

To generate an itinerary, the app needs to do things like:

1. organize the user’s travel conditions
2. think about possible spots and areas
3. build a flow for each day
4. verify spot existence and location information
5. check whether travel times and ordering are reasonable
6. format everything into a user-facing itinerary

Of course, verifying everything perfectly is not easy. Still, if this is going to be used as a travel planner, I want to reduce obviously non-existent places and unrealistic movement as much as possible.

Adding these checks naturally increases the processing time. But this time is not just meaningless delay. It is also time spent improving the quality of the itinerary.

The problem is that this necessary time is invisible to the user.

Behind the scenes, the app may be generating, checking spots, and formatting the itinerary. But on the screen, it can look like nothing is happening. I felt that how this time is presented is an important UX problem.

## I first tried skeletons and loading spinners

The first thing I tried was the common waiting UI.

Specifically, I used things like:

* loading spinners
* skeleton UI
* text such as “Generating...”

These are easy to implement, and they at least tell the user that something is being processed. But when I used it myself, it felt a little unsatisfying.

A spinner tells users that something is moving. But it does not tell them how long they may have to wait or what is currently happening.

Skeleton UI is great for loading normal lists or card layouts. But I felt that it did not quite match the experience of AI generation, where the app is actively thinking and assembling a result.

This felt especially true for a travel planner. While waiting, the user is imagining a trip they might take. It felt wasteful to make that time feel like nothing more than waiting.

## Adding a progress bar

Next, I added a **progress bar**.

Of course, the progress of AI generation cannot be expressed as an exact percentage. I cannot accurately say, “It is now 37% complete.” API response time and validation time can also vary.

So the progress bar here is not an exact measurement. It is a form of progress expression designed to reduce anxiety.

From the user’s point of view, a screen that changes over time feels much safer than a screen where nothing changes.

The important thing is not to make the progress perfectly accurate. The important thing is to communicate that:

* the process has not stopped
* generation consists of multiple steps
* the result is gradually getting closer

In a travel planner, itinerary generation is not a single simple generation call. The app needs to think about candidate spots, adjust the order, check existence and movement, and create an itinerary that is realistic as a whole.

Even if I do not show all of that internal processing directly, I felt it was meaningful to communicate that the itinerary is being assembled properly.

## The idea of showing travel tips during generation

After that, I started thinking about showing **travel tips** during the generation time.

The idea came from games.

In games, loading screens often show small hints or pieces of trivia while the player waits. The player is technically just waiting, but the time becomes a little more meaningful. Instead of simply staring at a loading screen, they can learn something or feel more connected to the world of the game.

I personally like that experience.

So I wondered if the same idea could be applied to an AI travel planner.

During itinerary generation, the app could show short tips such as:

* small tricks that are useful while traveling
* perspectives for enjoying a destination
* things that are helpful to know before a trip
* cultural or sightseeing trivia

This would let users feel a little more like they are already preparing for a trip while they wait. Instead of just saying “processing,” the UI could create a sense that the journey is about to begin.

## This is surprisingly rare in web apps and AI apps

Tips on loading screens are common in games, but I do not feel they are used as often in web apps or AI apps.

Most apps use one of the following:

* a spinner
* a skeleton screen
* “generating” text
* streaming output

These are not bad choices. In many cases, they are enough.

But for a travel planner, where the user is already imagining the place they might visit, even a few seconds of waiting can become part of the experience.

As a developer, I naturally want AI generation to be as fast as possible. But the waiting time cannot always be reduced to zero.

And in a web app, the longer the wait feels, the more likely it is to cause reloads or abandonment. That is why I felt that turning waiting time into something meaningful could have real value.

## The implementation I adopted

In the end, I decided to show **a progress bar and travel tips** during the waiting time in Tabidea.

I tried skeletons and loading spinners, but they made the wait feel a little too empty. So I kept a progress bar to show that the process is moving forward, and displayed short travel tips below it.

The implementation is simple in concept. When the user starts itinerary generation, the UI switches to a waiting screen. Until the generation process completes, the screen shows a progress bar and tips.

The tips are not just one fixed sentence. Instead, I rotate through several short messages.

I also tried to make sure the screen contains more than a spinner, so that users do not feel unsure about whether the app is actually working.

This makes it easier to create a state where users can feel that:

* the process is progressing
* they are not only waiting, but also seeing useful information
* the time until the itinerary is complete feels like part of the travel experience

This is especially fitting for a travel product. Travel is not only about the final plan. The time spent imagining the trip also has value.

For that reason, showing travel tips during generation feels less like filler and more like part of the product experience.

## What to be careful about when showing tips

That said, showing tips does not mean anything goes.

For travel-related apps, accuracy matters. Information such as opening hours, prices, and transportation details can change. It may be risky to show such information casually as lightweight loading tips.

I think tips are better suited for things like:

* cultural trivia that is unlikely to change often
* general ideas for enjoying travel
* perspectives for thinking about seasons and times of day
* advice about packing or moving around
* ways to look at sightseeing spots

On the other hand, information like the following should probably be shown only when needed, together with a reliable source:

* latest opening hours
* prices
* service suspensions
* precise route guidance
* reservation availability

Tips should also be short. During waiting time, I think one or two sentences per tip is usually enough.

## A waiting screen is not just a place to wait

While thinking about this, I realized that a waiting screen is not merely a waiting area.

In AI apps, generation time is often unavoidable. And in web apps, that waiting time can easily lead to reloads or abandonment.

The question is whether that time becomes:

* time the user is forced to endure
* time spent staring at a spinner
* time spent feeling anxious

or whether it becomes:

* time where users can see that generation is moving forward
* time that increases anticipation for the result
* time that communicates the atmosphere of the product

For Tabidea, the theme is travel. Travel is enjoyable not only after departure, but also during planning.

That is why I wanted the waiting screen during itinerary generation to feel less like a simple processing screen and more like **time spent preparing for the trip**.

## I want to combine this with photos in the future

In the future, I would also like to show **photos from around the world**, or photos related to the user’s destination, during the generation time.

In travel, images have a strong impact. If users see photos of streets, nature, architecture, food culture, or local atmosphere while the itinerary is being generated, they may find it easier to imagine the place they might visit.

This would not be just decoration. It could help turn waiting time into time that builds anticipation for the destination.

However, photos need to be handled carefully too. If the photo has nothing to do with the user’s destination, it may feel strange. If the photo strongly suggests a spot that does not appear in the final itinerary, it may also create confusion.

So I think it would be better to start with general travel photos from around the world, and later move toward photos that are related to the destination or candidate areas being generated.

If tips make waiting time meaningful through reading, photos can make waiting time more exciting through visual imagination.

By combining the two, I think the waiting screen can become an experience that feels even more like Tabidea.

## Conclusion

In AI apps, it is difficult to eliminate generation time completely.

Of course, we should still work to make responses faster. Shortening prompts, parallelizing processing, and reducing unnecessary API calls are all important.

But even after optimization, some waiting time will remain.

If streaming fits the product, gradually showing the output is very effective. But for apps like travel planners, it may be more natural to show a checked and organized result all at once rather than exposing intermediate output.

In that case, the design of the waiting experience becomes important.

This time, inspired by loading screens in games, I adopted a UI that shows a progress bar and travel tips during the generation waiting time in my AI travel planner.

AI generation time can be treated as nothing more than a weakness. But if it is connected to the theme of the product, it may also become time that increases the user’s anticipation.

For a travel planner, the trip does not begin only when the final itinerary appears.

I think it begins little by little **during the time the user is waiting for the itinerary to be generated**.

Please try the generation waiting experience in **Tabidea**.

[Tabidea](https://tabide.ai)
