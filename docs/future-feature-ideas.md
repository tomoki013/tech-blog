# Future Feature Ideas

This document records ideas for future enhancements. These are **not planned for implementation**
in the current phase. Prioritize based on user demand, SEO value, and maintenance cost before
picking anything up.

---

## Content & Discovery

- **Tag filtering UI** — client-side filter on the articles listing page by tag. Low priority
  until the article count is large enough to need it; server-rendered tag pages are simpler.
- **Search** — full-text search across articles. Consider Pagefind (static, zero runtime cost)
  before any client-side library. Only useful once 30+ articles exist.
- **Article series** — group multi-part articles into series with prev/next navigation.
- **Reading time estimate** — calculate from word count at build time; add to ArticleCard and
  article header.
- **OGP image generation** — dynamic per-article OGP images via Satori or a pre-built template.
  Currently all pages share the default OGP image.

## Portfolio & Works

- **Resume / CV page** (`/resume/`, `/en/resume/`) — single-page printable resume. Would need
  careful content decisions; defer until content is stable.
- **MenuFrontier project entry** — add to Works once the project is ready to be showcased
  publicly.
- **Works filtering by category** — pill buttons (app / blog / tool) above the Works grid.
  Only worth it when there are 8+ projects.
- **Project screenshots / previews** — add an optional `thumbnail` field to the Project type and
  show it in ProjectCard.

## Developer Experience

- **Copy-to-clipboard button** on code blocks — useful but adds JavaScript weight. Evaluate
  after measuring the actual demand from readers.
- **Dark-mode aware OGP images** — separate OGP images for light/dark. Complex and low ROI.
- **RSS category feeds** — per-tag RSS feeds in addition to the main feed.
- **Webmentions** — integrate Webmention.io for cross-site reactions. Requires an external
  dependency; assess privacy implications first.

## Analytics & Monitoring

- **Privacy-preserving analytics** — Plausible or Fathom. Evaluate cost vs. insight value;
  the current Lighthouse CI setup already measures performance. Add only if navigation patterns
  or content popularity data would drive meaningful decisions.
- **GitHub Actions CI** — run LHCI and JS budget check on every PR. Wire up once the local
  EPERM issue is confirmed not to affect Ubuntu runners.

## Internationalisation

- **Translated article content** — auto-translate articles to English using an LLM at build
  time. High complexity; only useful if significant English-speaking traffic arrives.
- **Additional locales** — unlikely given the scope, but the i18n config is extensible.

---

*Last updated: 2026-05-28*
