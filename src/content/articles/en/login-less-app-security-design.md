---
title: "Security Design to Consider When Building a Login-less App"
description: "Removing login means replacing identity verification and permission management with other mechanisms. Using Nobo Page as an example, this note organizes design topics like sessions, share URLs, tokens, and XSS."
publishedAt: "2026-06-05 12:00"
tags: ["Security", "Web", "Design", "Nobo Page"]
draft: false
projectIds: ["nobo-page"]
---

## Introduction

An app you can use without logging in is convenient.

There's no need to enter an email address or set a password — you open the page and start using it right away. It pairs especially well with services that aren't meant to last long, such as temporary memos, event guides, or simple shared boards.

At the same time, removing the login screen doesn't necessarily make the design simpler.

A login feature is not only there to display a username. It also plays roles like these:

- confirming who created the data
- deciding who can view, edit, or delete it
- recovering lost permissions
- identifying unauthorized operations

When you remove login, you need to either replace these roles with another mechanism or restrict the features themselves.

In this article, I'll organize what's worth thinking about when designing a login-less app, using **Nobo Page** — which I'm currently considering building — as an example.

## "Login-less" doesn't mean "no authentication"

In an app with login, you can judge permissions based on the user's account.

For example: "this user is the creator of this data, so they can edit it."

Without login, you can't verify identity using an account. So you end up judging permissions based on something else. The typical options are:

- the browser session
- cookies
- randomly issued tokens
- dedicated view/edit URLs
- identifying information stored on the device

In other words, even without login, you're still deciding "should this operation be allowed?" through some mechanism.

It's closer to the truth to say you're replacing account authentication with another mechanism, rather than removing authentication entirely.

## If you don't share, the design can be quite simple

Even in a login-less app, if you don't share data with others, there's much less to think about.

For example, a design where data can only be viewed from the browser session that created it.

```text
Create data
  ↓
Save to the server
  ↓
Retrievable only from the creating session
```

In this case, you don't need to include the access permission in the URL.

If you manage the session with a secure cookie and prevent retrieval from other browsers or devices, you can more easily avoid the problem of data being seen just because a URL leaked. In particular, setting `HttpOnly` on the session cookie reduces the risk of the cookie being read directly by JavaScript on the page.

However, this doesn't make the XSS problem go away.

If malicious JavaScript runs on the page, then even if it can't read the cookie value directly, it can still send requests to the API using the current session. For example:

- read the data currently displayed
- rewrite the contents
- call the delete API
- send the entered content to an external destination

So a session-only design can reduce risk, but it doesn't make XSS countermeasures unnecessary.

## The hard part is "sharing without login"

A login-less app's design becomes especially complex when you let users share the data they created.

If the people you share with also don't have accounts, the server can't use accounts to judge "is this person allowed to view?"

One approach is to issue a URL containing a random string, and treat possession of that URL as the permission.

```text
Has the view URL  → can view
Has the edit URL  → can edit
Has the admin URL → can delete or change settings
```

URLs that function as permissions in this way are generally called **Capability URLs**.

It's a convenient mechanism, but this URL is not merely the address of a page. Possessing the URL is close to knowing a password.

## "Only people who know the link" isn't necessarily private

Services that use share URLs often explain it as "only people who know the link can view it."

But this phrasing needs some care.

A person who receives the link can forward it to someone else. It also remains in chat histories and emails, and it can appear in screen shares or screenshots. Once a link has leaked, it isn't easy to fully reclaim it.

So claiming that a service using share URLs is "safely private" is dangerous. More accurately, the state is:

> Anyone who knows this link can access it.

You also need to clearly explain to users that it isn't suited for storing confidential information or important personal data.

## Separate view, edit, and admin permissions

Issuing a single share link, where anyone who has it can view, edit, and delete, is simple. But the damage when the link leaks is also large.

So there's an approach of separating permissions by purpose.

```text
View link
Edit link
Admin link
```

The view link only allows seeing the contents; the edit link allows changing them. High-impact operations like deletion or changing the retention period are limited to the admin link.

If Nobo Page offers sharing, separating permissions like this is a candidate design. Separating permissions means that even if you share the view link widely, you avoid also granting edit or delete rights.

## Don't store permission tokens directly in the DB

The random token contained in a share URL effectively plays the same role as a password. So you want to avoid storing the token directly in the database.

```text
Share URL:
https://example.com/page/123#edit=abc123...

DB:
edit_token = abc123...
```

With this, anyone who can read the database — or anyone, if the data leaks for some reason — could use the edit permission as-is.

Instead, store only the hash of the token on the server.

```text
What the user holds:
edit_token = abc123...

What's stored in the DB:
edit_token_hash = HASH(abc123...)
```

On access, hash the token received from the user the same way and compare it with the stored value. This makes it hard to recover the original token from the database value alone.

That said, hashing before storage doesn't make everything safe. The actual token exists in the user's browser, so browser-side safety matters too.

## Why use a URL fragment, and its limits

When including a share token in a URL, there's an approach of using a URL fragment instead of a query parameter.

```text
https://example.com/page/123#edit=secret-token
```

The part after `#` is normally not sent to the server in HTTP requests. So you can more easily avoid the token remaining as-is in CDN or web server access logs.

On the other hand, a URL fragment can be read by JavaScript in the browser. That means it can leak through paths like these:

- XSS exists on the page
- a malicious external script reads it
- a browser extension accesses it
- the user themselves forwards the URL
- it appears in a screenshot or screen share

A URL fragment is a means to make tokens less likely to remain in server logs. Putting it in the fragment doesn't make the token itself safe.

## Sharing magnifies the impact of XSS

XSS is a vulnerability where strings entered by a user aren't handled safely and end up executed as HTML or JavaScript. In a login-less sharing app, it needs especially careful thought.

For example, suppose an attacker can save content like this to a board:

```html
<script>
  // malicious processing
</script>
```

If this content is displayed as HTML as-is, the script may execute in the browser of another user who opens the share link.

In a non-shared, session-only app, basically only the person who entered the data sees it. So the attack path of getting another user to trigger saved content — Stored XSS — becomes quite narrow. In a sharing app, however, an attacker can save malicious data and get others to open the share URL.

The main countermeasures include:

- not rendering user input directly as HTML
- thoroughly applying HTML escaping
- passing Markdown through a safe sanitizer when used
- rejecting dangerous URL schemes (such as `javascript:`)
- setting a Content Security Policy
- not allowing arbitrary scripts or embedded code

In Nobo Page too, when displaying text and links inside a board, the design must not simply convert input into HTML.

## HttpOnly cookies alone can't prevent XSS

Using HttpOnly cookies for session management is important. Setting HttpOnly prevents JavaScript from reading the cookie directly via `document.cookie`.

However, when XSS occurs, the attacker's script runs on the same page as the user. So even if it can't obtain the cookie itself, it can make the browser send the cookie automatically and call the API.

```text
Stealing the cookie
  → easier to prevent with HttpOnly

Operating the API with the current session
  → still possible if XSS exists
```

HttpOnly cookies are a countermeasure against exfiltrating session information. They don't prevent screen reading or unauthorized operations via XSS.

## Don't leave too much permission info in the browser

In login-less apps, you may be tempted to store permission info in the browser so users can edit the same data again — for example, saving the edit token in LocalStorage.

But LocalStorage can be read by JavaScript on the page. If XSS occurs, the stored edit or admin tokens could be sent to an external destination. Also, on a shared PC or someone else's device, the permission info may linger on that device.

So you need to decide carefully what to store in the browser. Information like language and theme settings should be considered separately from edit and admin permissions.

In Nobo Page, rather than storing permissions long-term for convenience, having users keep the admin link themselves as needed is the safer side.

## Retention period isn't only about cost or capacity

In login-less apps, shortening the retention period is also a security measure.

Storing data for a long time keeps old share links valid for a long time too. Even if the user has forgotten the link exists, someone who received it in the past might still be able to access it. Furthermore, without login, it's hard to verify whether an inquiry truly comes from the real creator.

So a design that auto-deletes after a short period has meanings like these:

- reducing abandoned data
- preventing old share links from lingering
- not retaining unnecessary personal data for a long time
- keeping the scope of recovery and support responsibility small

Nobo Page mainly assumes uses like temporary event guides and short-term memos. Limiting the retention period isn't just a free-plan restriction — it's also safety design matched to the nature of the service.

## Separate screens that include external scripts

Web services accumulate various external scripts: analytics, ads, heatmaps, chat support, and so on. But external scripts also run as JavaScript on the page.

On screens that handle share tokens or user input, the more external scripts you add, the wider the scope you have to manage. So rather than putting the same script on every page, there's the idea of separating by the screen's role.

For example, in Nobo Page you could separate them like this:

```text
Top page / explanation pages
→ use analytics or ads as needed

Board view / edit pages
→ place as few external scripts as possible
```

The required level of safety differs between a service's marketing pages and screens that handle permission info or user data.

## Don't assume recovery is possible

In services with login, you can verify identity using an email address and recover accounts or data.

Without login, there's no means to verify whether a user who lost their admin link is truly the creator. Even if someone inquires "I'm the one who created this board," reissuing admin rights is dangerous if they can't prove it.

So in exchange for the lightness of login-less, constraints like these become necessary:

- if you lose the admin link, it can't be recovered
- deleted data generally can't be restored
- data past its retention period can't be restored
- permissions won't be reissued based on an inquiry alone

It looks inconvenient, but it's also a restriction necessary to avoid handing data to a third party.

## In Nobo Page, keep the value of sharing

If you remove sharing and make it a session-only app, Nobo Page's design can be quite simple. There's no need to put permissions in URLs, and no need to separate view, edit, and admin links.

But in Nobo Page, being able to hand what you created to others right away is one of its values. Same-day event guides, short-term shared memos, information pages opened from a QR code — these can't fulfill their purpose if only the creator can view them.

So rather than removing the sharing feature itself, you need to design on the premise of the risks that sharing adds. Concretely, the approach is:

- separate view, edit, and admin permissions
- issue sufficiently unguessable tokens
- don't store raw permission tokens in the DB
- give permission links expiration and revocation means
- display user input safely
- restrict external scripts on board screens
- don't make the retention period longer than necessary
- clearly communicate that it isn't meant for confidential information

Being login-less doesn't make an app dangerous by itself. But since you're removing the identity verification and permission management that login handled, you must not leave the mechanism that replaces it ambiguous.

## Summary

A login-less app can greatly reduce the burden of getting started. It's an especially good fit for temporary uses, or situations where making an account would be overkill.

At the same time, removing login means you need to think about the identity verification and permission management that the account handled in another way. A non-shared, session-only app can have a relatively simple structure. But when you share data with others without login, the URL or token itself becomes the permission.

In that case, the following points matter:

- treat the URL as a key, not merely an address
- don't make permissions broader than necessary
- store tokens safely
- prevent permission leakage and unauthorized operations via XSS
- limit the retention period and recovery scope
- honestly communicate the service's limits to users

The convenience of login-less doesn't mean you don't have to think about security. Rather, to let users use it safely without being aware of it, the design behind the scenes needs to differ from a typical login-based app.
