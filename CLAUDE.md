# Claude Code Guidance

This repository is an Astro v6 + Tailwind CSS v4 static engineering blog and portfolio site.

## Before making changes

**Read `docs/frontend-quality-standards.md` before changing UI, pages, routing, content schema, SEO, accessibility, or performance-related code.**

## Architecture constraints

- Preserve the Astro static-first architecture (`output: "static"`).
- Do not add React, MDX, a database, an API, a CMS, analytics, or heavy dependencies without explicit approval.
- Keep client-side JavaScript minimal. The JS gzip budget is 50 KB.
- Keep semantic HTML and accessibility intact (Lighthouse accessibility ≥ 0.95).
- Keep Japanese (`/`) and English (`/en/`) routes consistent and paired.
- Keep performance budgets passing. Run `pnpm perf:js-budget` and `pnpm perf:lhci` after changes.
- Do not loosen Lighthouse or JavaScript budgets silently.

## Technology

- Framework: Astro v6
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`)
- Language: TypeScript
- Code quality: Biome v2 (`pnpm check`, `pnpm check:write`)
- Package manager: pnpm
- Deployment: Cloudflare Workers Static Assets

## Key paths

| Purpose | Path |
|---|---|
| Quality standards | `docs/frontend-quality-standards.md` |
| Project IDs | `src/data/project-ids.ts` |
| Project data | `src/data/projects.ts` |
| i18n config & paths | `src/i18n/config.ts` |
| UI labels | `src/i18n/ui.ts` |
| Article helpers | `src/lib/articles.ts` |
| Project helpers | `src/lib/projects.ts` |

## Required checks

```bash
pnpm check
pnpm build
pnpm perf:js-budget
pnpm perf:lhci
```

## Final report

When finishing work, summarize:
- Files changed
- Semantic HTML impact
- Accessibility impact
- SEO impact
- Performance impact
- Commands run and results
- Any failures or unresolved issues
