---
title: "Migrating Tabidea's Itinerary Generation Pipeline to Cloud Run"
description: "Why and how I moved Tabidea's itinerary generation pipeline from a Netlify Functions-based setup to an asynchronous job execution model with Cloud Run and Cloud Tasks."
publishedAt: "2026-05-22 03:00"
tags: ["Tabidea", "Cloud Run", "Netlify", "Cloud Tasks", "Indie Development"]
draft: true
---

# Migrating Tabidea's Itinerary Generation Pipeline to Cloud Run

## Introduction

Tabidea uses AI to generate travel itineraries.

At first, the itinerary generation flow was handled as part of the web application's API layer. That was good enough for starting small, and it was also easy to implement as an indie developer.

However, as I continued building the product, I realized that itinerary generation was not just a normal API response. It was closer to a long-running asynchronous workflow.

It involves more than just asking AI to generate something. It also needs to handle user input, external information, validation before saving, progress updates, and failure states. Trying to fit all of that into a short-lived HTTP request gradually became unreasonable.

So I migrated Tabidea's itinerary generation pipeline from a Netlify Functions-based setup to an asynchronous job execution model using Cloud Run and Cloud Tasks.

This article does not go into the detailed logic of the itinerary generation pipeline itself. Instead, it focuses on why I migrated it, how I approached the migration, and what went wrong along the way.

## 1. Why I migrated it

The main reason was simple: itinerary generation was becoming too heavy to treat as a normal API request.

It is not a lightweight process that finishes immediately after the user clicks a button.

The system needs to take the user's destination, travel dates, preferences, and constraints, then generate an itinerary that can actually be saved. It also needs to report progress and handle failures gracefully.

That kind of work is more naturally modeled as a job than as a synchronous API response.

Before the migration, too much responsibility lived close to the frontend API layer. That worked in the beginning, but as the generation flow became heavier, several problems became more obvious.

- The generation process was tied to the lifetime of a request.
- Progress was hard to represent cleanly.
- Failure states were difficult to store.
- Retry and cancellation were difficult to design.
- It was hard to connect the pipeline to future measurement and improvement workflows.

Itinerary generation is the core of Tabidea.

That is why I decided not to simply extend timeouts or patch around the problem. I wanted to rethink the execution model itself.

## 2. The new mental model

After the migration, itinerary generation is no longer treated as something the API must complete immediately.

Instead, it is treated as a stateful asynchronous job.

At a high level, the architecture looks like this:

- Netlify serves the frontend.
- Cloud Run receives generation API requests.
- A Cloud Run worker handles the heavy generation process.
- Cloud Tasks dispatches work from the API service to the worker.
- The database stores job state and results.
- Secrets are managed through a dedicated secret management layer.

The important part is that the browser no longer drives the heavy generation process directly.

The browser creates a generation job and watches its progress. The worker performs the heavy work. Once the job succeeds, the user is navigated to the saved itinerary.

This allowed me to keep the user experience mostly the same while moving the execution responsibility to a more appropriate place.

## 3. Splitting the API and worker

In Cloud Run, I separated the public API service from the private worker service.

The API service is the public entry point. It handles job creation, status checks, and cancellation.

The worker service handles the heavier itinerary generation process. It is not meant to be called directly from the browser. Instead, it is invoked through Cloud Tasks.

This separation was important.

The API should be short-lived. It should receive a request, create a job, enqueue work, and return the information needed by the client.

The worker can then handle the longer-running process. It can update progress, store intermediate state, and eventually save the generated itinerary.

By separating these roles, the responsibilities became much clearer.

## 4. I did not rewrite everything at once

I did not rewrite the entire itinerary generation logic at the same time as the infrastructure migration.

The first goal was to make the existing generation flow run on Cloud Run.

This was intentional.

If I changed the generation logic and the execution platform at the same time, debugging would become much harder.

If something failed, I would not know whether the generation quality changed, the worker failed, the database state was wrong, or the task dispatching was broken.

So I focused first on changing where the pipeline runs.

The internal generation details were kept mostly stable, while the execution layer and state management were moved toward the Cloud Run-based model.

## 5. What the production cutover involved

Migrating to Cloud Run was not just a matter of writing code and deploying it.

There were many surrounding tasks.

The migration involved:

- Creating the Cloud Run API service
- Creating the Cloud Run worker service
- Setting up a Cloud Tasks queue
- Configuring service accounts and IAM
- Moving secrets into a safer runtime environment
- Adding database changes for job state management
- Setting up Cloud Run domain mapping
- Configuring DNS for `api.tabide.ai`
- Waiting for the Google-managed certificate
- Connecting the Netlify frontend to the Cloud Run API
- Running production smoke tests

After doing all of this, I realized that the migration was not only about application code.

DNS, certificates, IAM, database migrations, queues, secrets, and frontend proxying were all part of the migration.

## 6. Things that went wrong

Several things went wrong during the migration.

Here are the main ones.

### Setting up the gcloud CLI took longer than expected

The first issue was local setup.

I ran into problems while installing the Google Cloud CLI on Windows. The installer got stuck, and in the end, a restart fixed the problem.

This was not an application-level issue, but it still took time.

Cloud migrations often sound like they are mostly about architecture and deployment, but in practice, local tooling matters too.

If the CLI does not work, nothing moves forward.

### `.gcloudignore` was necessary

I also had to prepare a `.gcloudignore` file.

At first, I assumed `.dockerignore` would be enough. However, the files uploaded to Cloud Build were not controlled only by `.dockerignore`.

Some local temporary files and working directories were about to be included in the upload.

That made me explicitly define what should be ignored for Cloud Build.

This is a small detail, but it matters for build time and security.

### IAM boundaries mattered more than expected

Once Cloud Run API, Cloud Run worker, Cloud Tasks, and Secret Manager were involved, IAM became important.

The API service is the public entry point. The worker service is internal. Cloud Tasks needs to invoke the worker. Each service also needs access to the secrets required for its role.

If even one permission is missing, the system does not work.

On the other hand, giving everything broad permissions is not a good idea either.

Even for an indie project, separating service accounts and keeping the responsibility boundaries clear was worth it.

### An old worker revision was still being called

The most memorable issue was an old worker revision.

Even if the API service has been updated, Cloud Tasks may still end up calling an old worker revision if the worker side is not updated correctly.

In my case, this caused the worker to run an old path that no longer matched the updated database state.

The lesson was clear: a health check is not enough.

Even if `/health` returns 200, that does not prove the generation pipeline works. I needed an end-to-end smoke test that actually created a generation job, dispatched it through Cloud Tasks, reached the worker, and completed the flow.

### Database constraints and runtime state got out of sync

Another issue was a mismatch between the states written by the worker and the states allowed by the database.

The worker tried to write a new state, but the database constraint did not allow it.

This is easy to miss if you only look at TypeScript types.

Database constraints are also part of the application contract. When job state is stored in the database, the runtime code and the database schema need to evolve together.

### DNS and certificates require patience

Setting up `api.tabide.ai` for Cloud Run also required waiting.

DNS propagation does not happen instantly. Sometimes public DNS resolvers already see the new record, while the local machine still does not.

The Google-managed certificate also does not become ready immediately after configuring DNS.

This part does not behave like application code. You cannot always change something and immediately see the result.

For production cutovers, I learned that it is important to check DNS, certificate state, and health endpoints step by step.

## 7. What improved after the migration

The biggest improvement was that itinerary generation became easier to reason about.

It is now a job, not just an HTTP request.

That made several things easier:

- Storing generation state
- Returning progress to the UI
- Recording failure states
- Thinking about retry and recovery
- Separating API and worker responsibilities
- Keeping heavy work away from the frontend
- Connecting the pipeline to future measurement and improvement workflows

For a product like Tabidea, where AI generation is central to the experience, it is important to be able to observe what happened after the fact.

How long did generation take?

Where did it fail?

What kind of input tends to take longer?

The migration made it easier to build that kind of foundation.

## 8. Cloud Run does not solve everything automatically

Moving to Cloud Run does not magically solve every problem.

In some ways, there are more things to think about.

Worker timeouts, Cloud Tasks retries, IAM, secrets, database migrations, logs, DNS, certificates, and deployment order all matter.

But I do not think this means the system simply became more complicated.

It feels more like the complexity was moved to the right place.

Itinerary generation was never a simple API request. I had only been forcing it into that shape.

By moving it into an asynchronous job model, the complexity became more visible and easier to manage.

## 9. What I want to do next

This migration gave Tabidea a more stable foundation for itinerary generation.

Next, I want to improve observability and management around the pipeline.

For example, I want to make it easier to see how long generation took, where failures tend to happen, and what kinds of inputs lead to longer processing time.

That said, itinerary generation is the core of Tabidea.

So I want to separate what can be shared publicly from what should remain internal.

In public articles, I will focus on how I moved heavy AI processing onto a better execution platform.

The generation logic itself will continue to be improved internally.

## Conclusion

This migration was not just a move from Netlify Functions to Cloud Run.

It was a shift from treating Tabidea's itinerary generation as a short-lived HTTP request to treating it as an asynchronous job running on Cloud Run.

One thing I learned is that when building AI-powered features, it is worth asking early whether the process is really an API response or whether it should be a job.

Starting with a simple API is fine.

But once the process becomes long-running, needs progress updates, has failure states, and should be improved over time, it may be time to model it as a job.

For Tabidea, combining Cloud Run, Cloud Tasks, and database-backed state management made the itinerary generation pipeline feel much closer to the right shape.

The migration was not painless.

I ran into local CLI issues, ignore file problems, IAM boundaries, old worker revisions, database constraint mismatches, DNS propagation, and certificate waiting.

But including those operational details, this was a necessary migration for continuing to improve the core experience of Tabidea.