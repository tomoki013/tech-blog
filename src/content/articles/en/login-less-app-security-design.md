---
title: "Security Design to Consider When Building a Login-less App"
description: "Removing login means replacing identity verification and permission management with other mechanisms. Using Nobo Page as an example, this note organizes design topics like authorization, sessions, CSRF, share URLs, tokens, and XSS."
publishedAt: "2026-06-05 12:00"
updatedAt: "2026-06-07 18:00"
tags: ["Security", "Web", "Design", "Nobo Page"]
draft: false
projectIds: ["nobo-page"]
---

## Introduction

An app you can use without logging in is convenient.

There's no need to enter an email address or set a password — you open the page and start using it right away. It fits especially well with services not meant for long-term use: temporary notes, event announcements, simple shared boards, and so on.

At the same time, removing the login screen doesn't necessarily simplify the design.

A login feature isn't just for displaying a username; it also plays roles like these.

- Confirming who created the data (authentication)
- Deciding who may view, edit, or delete it (authorization)
- Recovering lost permissions
- Identifying unauthorized actions

Here, "authentication" and "authorization" are distinct concepts. Authentication is verifying the identity of a user, process, or device; authorization is granting or checking access rights to a resource. When you remove login, you have to cover these roles with another mechanism or restrict the features themselves.

This post organizes what's worth considering when designing a login-less app, using **Nobo Page** — which I'm currently considering building — as an example.

## Even without login, you still need "authorization"

In an app with login, you can decide permissions based on the user's account.

For example: "this user is the creator of this data, so they may edit it." Here you use the result of account authentication to perform authorization.

Without login, you can't verify identity (authenticate) via an account. What you can confirm is usually not "is this person really the creator," but rather "did they present the correct edit token" or "do they hold the same session identifier as at creation time."

In other words, what a login-less app actually does is closer to **confirming possession of a secret that proves a permission**, rather than verifying a human's identity. Common means include:

- the browser session
- cookies
- a randomly issued token
- dedicated view / edit URLs
- identifying information stored on the device

A URL that functions as a permission in this way is generally called a **capability URL**. Rather than "removing login," it's closer to replacing account authentication with authorization based on possession of a secret.

As an aside, while the term and idea of a capability URL are sound, the W3C document people often cite is a First Public Working Draft from 2014 — not a W3C Recommendation. That's worth keeping in mind.

## If you don't share, the design can be quite simple

Even a login-less app needs far less consideration if the data isn't shared with others.

For example, a design where data can only be viewed from the session of the browser that created it.

```text
Create data
  ↓
Save to server
  ↓
Retrievable only from the creating session
```

In this case there's no need to put a permission in the URL.

If you manage the session with a secure cookie, you can more easily avoid the problem of a leaked URL exposing the data itself. That said, "only the creating browser can retrieve it" is a convenient simplification — what can actually access it is **any client that can present that session cookie**. If the session identifier is copied or stolen, it can be used from another browser too.

So if you use cookies, at minimum keep these in mind.

- Set `Secure`, `HttpOnly`, and an appropriate `SameSite` on the cookie
- Generate the session identifier with a cryptographically secure RNG, and make it long enough (128 bits or more as a guideline)
- Don't leave the lifetime to the cookie's Max-Age alone; manage the session's lifetime on the server too

### If you use cookies, don't forget CSRF

A common blind spot with cookie-based sessions is **CSRF (cross-site request forgery)**.

The browser automatically attaches cookies to requests aimed at the target site. So merely opening an attacker's page can cause the user to send unintended edit or delete requests. For state-changing requests, combine measures like these.

- Don't perform side effects such as edit/delete via GET
- Use your framework's CSRF protection or CSRF tokens
- Also validate the `Origin` header and use Fetch Metadata
- Set the `SameSite` attribute appropriately

`SameSite` suppresses many CSRF cases, but it isn't a single, complete defense in every configuration. As long as you use cookies, CSRF needs separate thought.

None of this makes XSS go away, either. If malicious JavaScript runs inside the page, it can send requests to the API using the current session even without reading the cookie value directly. A session-only design reduces risk, but it doesn't remove the need for XSS defenses.

## The hard part is "sharing without login"

A login-less app's design gets especially complex when you let created data be shared with others.

If the recipient also has no account, the server can't use an account to decide "is this person authorized to view it."

So one approach is to issue a URL containing a random string and treat possession of that URL as the permission.

```text
Holds the view URL    → can view
Holds the edit URL    → can edit
Holds the admin URL   → can delete or change settings
```

It's a handy mechanism, but this URL isn't just a page's address. Holding the URL is close to a state of knowing a password.

## "Only people who know the link" isn't necessarily private

Services that use share URLs often explain it as "only people who know the link can view it."

But this phrasing needs a little care.

Whoever receives the link can forward it to someone else. It remains in chat history and email, and it can appear in screen shares or screenshots. Fully recalling a once-leaked link isn't easy either.

So it's risky to flatly claim "it's safely private" for a service using share URLs. More accurately, the situation is:

> Anyone who knows this link can access it.

You also need to clearly explain to users that it isn't suited for storing confidential information or sensitive personal data.

## Separate view, edit, and admin permissions

Issuing a single share link that lets its holder view, edit, and delete is simple. But the damage when the link leaks is also large.

So one approach is to separate permissions by purpose.

```text
View link
Edit link
Admin link
```

The view link permits only viewing; the edit link permits changing content. High-impact operations like deletion or changing the retention period are limited to the admin link.

For Nobo Page too, if it offers sharing, separating permissions like this is a candidate design. With permissions separated, even if a view link is shared widely, you avoid also granting edit or delete. This is exactly the principle of least privilege.

## Don't store permission tokens as-is in the DB

The random token in a share URL is a secret that grants an operation simply by being presented. So you want to avoid storing the token as-is in the database.

```text
Share URL:
https://example.com/page/123#edit=abc123...

DB:
edit_token = abc123...
```

With this, anyone who can read the database — or anyone who obtains the data through a leak — could use the edit permission directly.

Instead, store only a digest (hash) of the token on the server.

```text
What the user holds:
edit_token = a random value of 128+ bits from a CSPRNG

What the DB stores:
edit_token_digest = HMAC-SHA-256(server_secret, edit_token)
```

What's worth noting here is that **this differs in purpose from password hashing.**

Because a password a user memorizes is easy to guess, it needs a deliberately slow hash like Argon2id or bcrypt. A sufficiently long token generated by a cryptographically secure RNG, on the other hand, is inherently hard to target with dictionary or brute-force attacks. So a costly password hash isn't mandatory for tokens; securing entropy matters more.

Even a plain `SHA-256(token)` provides brute-force resistance for a high-entropy token. Using `HMAC-SHA-256` with a server-side secret makes it harder for an attacker who only obtained the DB — and not the secret key — to compute the same digest.

For implementation, also keep these in mind.

- Use a cryptographically secure random generator (CSPRNG)
- Bind each token to its permission and expiry on the server side
- Make tokens revocable and rotatable
- For comparison, use a safe (timing-resistant) comparison function from an existing library
- Don't emit tokens to access logs, analytics platforms, or error bodies

So it isn't that "hashing makes it safe"; this is accurately understood as **a measure to mitigate the damage when the DB alone leaks.** Because the actual token exists in the user's browser, browser-side safety remains important too.

## Why use a URL fragment, and what comes after

When putting a share token in a URL, one option is to use a URL fragment rather than a query parameter.

```text
https://example.com/page/123#edit=secret-token
```

The part after `#` is normally not sent to the server in an ordinary HTTP request, and it isn't included in the `Referer` header either. So it's easier to avoid the token ending up as-is in CDN or web server access logs.

However, for the server to verify the edit permission, JavaScript must ultimately send the token to the server. Putting it in the fragment doesn't complete the story. Typically the flow is:

```text
Open /page/123#edit=secret-token
  ↓
JavaScript reads location.hash
  ↓
Sends it via the POST body or the Authorization header
  ↓
The server verifies it
  ↓
history.replaceState() removes the token from the URL
```

You need to make sure the token you sent isn't recorded into APM, a WAF, application logs, or error reports. And after verification, clear the token from the address bar and history with something like `history.replaceState()`, so it isn't re-exposed by sharing or the back button.

To lean toward the safer side, instead of sending the raw edit token from JavaScript every time, this composition is also a candidate.

1. Hand the fragment token to the server once to exchange it
2. Issue a short-lived session scoped to that operation
3. Use that session via an `HttpOnly` cookie thereafter
4. Remove the original token from the URL

But since this composition uses cookies, the CSRF measures above are needed as a set. A URL fragment is, at most, one means of keeping the token out of server logs — it doesn't make the token itself safe.

## Sharing amplifies the impact of XSS

XSS is a vulnerability where strings entered by a user aren't handled safely and get executed as HTML or JavaScript. In a login-less sharing app, it needs especially careful thought.

For example, suppose an attacker manages to save content like this to a board.

```html
<script>
  // malicious code
</script>
```

If this content is displayed as raw HTML, the script may run in the browser of another user who opens the share link.

In a non-sharing, session-only app, the path to making an ordinary other user trip over saved content is narrower. But that doesn't make Stored XSS disappear. Saved content can reach other people's eyes on screens like these.

- The operator's admin / report-review screen
- Support handling screens
- Preview or export features
- Screens used for incident investigation
- Sharing features added in the future

If any of these display the saved content, it can still be Stored XSS against another person. Moreover, Reflected XSS and DOM-based XSS occur regardless of whether sharing exists.

Main defenses include:

- Don't render user input directly as HTML
- Apply context-appropriate output encoding (HTML escaping) thoroughly
- Use safe DOM APIs and avoid raw assignment to `innerHTML`
- Reject dangerous URL schemes (such as `javascript:`)
- Don't allow arbitrary scripts or embedded code

Content Security Policy (CSP) is also useful, but it's accurately positioned as one layer of **defense in depth**, not the primary defense. The basics are safe DOM APIs, context-appropriate output encoding, and HTML sanitization only where needed.

When handling Markdown, rather than "sanitize the Markdown input and then turn it into HTML," it's safer to **convert the Markdown to HTML and then pass that HTML through a trusted sanitizer**, because dangerous HTML can be produced during conversion.

## HttpOnly cookies alone don't prevent XSS

Using HttpOnly cookies for session management is important. Setting HttpOnly prevents JavaScript from reading the cookie directly via `document.cookie`.

However, when XSS occurs, the attacker's script runs on the same page as the user. So even without obtaining the cookie itself, it can make the browser auto-send the cookie and call the API.

```text
Steal the cookie
  → easier to prevent with HttpOnly

Operate the API with the current session
  → still possible if XSS exists
```

HttpOnly cookies are a measure against exfiltrating session information. They don't prevent reading the screen or performing unauthorized operations via XSS.

## Don't leave too much permission info in the browser

In a login-less app, you may be tempted to store permission info in the browser so the user can edit the same data again — for example, saving the edit token in LocalStorage.

But LocalStorage can be read by JavaScript on the page. If XSS occurs, the saved edit or admin token could be sent to an external party. The same goes for sessionStorage and IndexedDB; they are equally weak against XSS. Also, when using a shared PC or someone else's device, the permission info keeps lingering on that device.

So you need to decide carefully what to store in the browser. Information like language or theme settings should be considered separately from edit or admin permissions.

For Nobo Page, rather than storing permissions long-term for convenience, a design where users keep the admin link themselves as needed leans toward the safer side.

## Don't let confidential responses be cached

View / edit screens and API responses that carry tokens should specify cache control explicitly depending on their content.

With nothing specified, confidential responses may remain in the browser, a CDN, a proxy, a Service Worker, and so on. This can even lead to incidents where a previous user's content is shown on a shared device.

- Consider `Cache-Control: no-store` for confidential responses
- Note that `no-cache` doesn't mean "don't store"; it means "revalidate before use"
- Keep URLs and responses containing tokens out of intermediate caches

## Don't perform deletion or permission changes via GET

Avoid a design where merely opening a capability URL performs deletion, publishing, or permission changes.

Link-preview generation, search-engine crawlers, and security scanners may access the URL automatically. If they trip over a URL with side effects, unintended deletion or changes can happen.

Always perform state-changing operations through explicit requests like POST, combined with the CSRF measures above. The principle is to give "opening a URL" no destructive side effects.

## Prepare for abuse unique to anonymous access

Without login, it's hard to grasp who is using how much on a per-user basis. So prepare for abuse unique to anonymous services.

- Spam posts and mass automatic board creation
- Abuse aimed at consuming storage
- Creating and distributing phishing pages

For each create / update / view API, providing rate limiting that doesn't rely on IP alone, size and count limits, anomaly detection, and means to report and revoke leans toward the safer side.

If you offer file attachments in the future, you'll separately need type and size restrictions, storage outside the web root, virus scanning, download controls, and so on.

## Don't assume things can be recovered

In a service with login, you can verify identity with an email address and recover an account or data.

Without login, there's no way to confirm whether a user who lost the admin link is really the creator. Even if someone inquires "I'm the one who made this board," reissuing admin permission without proof is dangerous.

So in exchange for the lightness of being login-less, constraints like these are needed.

- Losing the admin link means it can't be recovered
- Deleted data, in principle, can't be brought back
- Data past its retention period can't be recovered
- Permissions aren't reissued on an inquiry alone

Also, if you explain "it auto-deletes" or "it can't be recovered," the scope should match reality. Even if you delete the primary data, copies remaining in places like these would contradict the explanation.

- Backups
- CDN caches
- Search indexes
- Thumbnails and converted files
- Audit logs and incident-analysis data

It looks inconvenient, but it's also a restriction needed to avoid handing data to third parties.

## Separate external scripts by "origin," not just by "screen"

Web services accumulate various external scripts: analytics, ads, heatmaps, chat support, and more. An external script runs as JavaScript with the same privileges as the page it's embedded in, so it brings risks like arbitrary code execution, leaking confidential information, and compromise of the provider.

So rather than putting the same script on every page, there's a way of thinking that separates by the screen's role.

But merely "not placing it on the board screen" can be insufficient isolation as long as both share the same origin. To separate more strongly, separate the origin itself.

```text
www.example.com
  → intro / ads / analytics

app.example.com
  → board viewing / editing
  → external scripts disallowed in principle
```

Web Storage and IndexedDB are isolated per origin, so a separate origin also isolates client-side data. Along with that, it's important not to carelessly set `Domain=.example.com` on cookies, and to limit them to the necessary origin.

## For Nobo Page, keep the value of sharing

Remove sharing and make it a session-only app, and Nobo Page's design can be quite simple. There's no need to put permissions in the URL, and no need to separate view, edit, and admin links.

But for Nobo Page, being able to hand created content to others right away is one of its values. Day-of event guidance, short-lived shared notes, info pages opened from a QR code — these don't fulfill their purpose if only the creator can view them.

So rather than removing sharing itself, you need to design on the premise of the risks that sharing adds. Concretely, a policy like this.

- Separate view, edit, and admin permissions (least privilege)
- Issue tokens of 128+ bits from a CSPRNG
- Don't store raw permission tokens in the DB; keep digests instead
- Give permission links an expiry and a revocation method
- If using cookies, set `Secure` / `HttpOnly` / `SameSite` and CSRF measures
- Display user input safely (output encoding and HTML sanitization)
- Don't let confidential responses be cached
- Don't perform state changes via GET
- Provide rate limiting and abuse measures for anonymous use
- Restrict external scripts on the board screen, ideally on a separate origin
- Don't make the retention period longer than necessary
- Clearly communicate that it isn't for confidential information

Being login-less doesn't make something dangerous on its own. But since you remove the authentication and authorization that login provided, you must not leave the replacement mechanism vague.

## Conclusion

A login-less app greatly reduces the burden before someone can start using it. It fits especially well with temporary uses and situations that don't warrant creating an account.

On the other hand, when you remove login, you have to think about the authentication and authorization the account provided in another way. A non-sharing, session-only app can have a relatively simple structure — but as long as it uses cookies, you still need to think about CSRF and session management. When you share data with others without login, the URL and token themselves become the permission.

In that case, these points matter.

- Treat the URL as a key, not just an address
- Don't make permissions broader than necessary
- Generate and store tokens safely
- Prevent permission leakage and unauthorized operations via XSS and CSRF
- Limit caching, retention period, and recovery scope
- Honestly communicate the service's limits to users

The ease of being login-less doesn't mean you don't have to think about security. If anything, to let users use it safely without being aware of it, the backend needs a design different from a normal login app.

## References

- [Authentication — NIST Computer Security Resource Center Glossary](https://csrc.nist.gov/glossary/term/authentication)
- [Good Practices for Capability URLs (W3C Working Draft)](https://www.w3.org/TR/capability-urls/)
- [Cross-Site Request Forgery Prevention — OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [Session Management — OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [Cross Site Scripting Prevention — OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Same-origin policy — MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Same-origin_policy)
