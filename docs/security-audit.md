# Security audit — 2026-10-28

## Scope and results

The site stays fully static (`output: "static"`). There is no Node server,
runtime image endpoint, user upload, authentication, database, or CMS in production.
Build dependencies still matter: compromised or malicious input can affect a developer
machine or CI even when the published site contains only static assets.

The initial full `pnpm audit` reported 124 findings: 2 critical, 58 high,
48 moderate, and 16 low. After the updates, `pnpm audit --prod` reports zero
known vulnerabilities. The full audit retains three high findings confined to
the Lighthouse CI dependency tree; these are documented below, not hidden from
the raw audit command.

Updated Astro to 7.4.2, Tailwind to 4.3.3, Astro Check to 0.9.12, Lighthouse CI
to 0.15.1, Wrangler to 4.154.0, and transitive packages within their supported
version ranges. Astro's schema import now uses `astro/zod`. Node 26's deprecated
`module.register()` warning and all 13 Astro Check hints are resolved.

Astro 7 changes Markdown processing and whitespace handling. The project explicitly
keeps the Unified processor, existing rehype transforms, and `compressHTML: true`.
`@astrojs/markdown-remark` was already part of Astro 6's dependency tree; its explicit
dependency preserves link cards, table wrappers, task-list labels, and highlighting.
It does not enable MDX or add browser JavaScript.

## Package manager and CI

pnpm itself is not covered by the application's dependency audit. Version 10.19.0
is affected by installation path-traversal advisories including
[GHSA-vq4v-j7r6-jq4m](https://github.com/pnpm/pnpm/security/advisories/GHSA-vq4v-j7r6-jq4m)
and [GHSA-c59q-g84q-2gj5](https://github.com/pnpm/pnpm/security/advisories/GHSA-c59q-g84q-2gj5).
The toolchain therefore pins pnpm 10.34.9, with the registry SHA-512 integrity
recorded in `package.json`. Mise uses the npm backend so pnpm runs on the pinned
Node 26.12.1 instead of the old standalone executable's bundled Node 20.

Gitleaks 8.30.1 scans Git history with secret values redacted. CI and deployment
fetch full history and run secret scanning, an unfiltered production dependency
audit, and the full dependency policy check before building. The CI also tests
the policy's rejection of new paths, new advisories, expired/stale exceptions,
and unavailable audit data. Network errors do not pass the dependency check.

GitHub Actions are pinned to verified commit SHAs. Wrangler Action 4.1.3 uses
Node 24 for the action host, removing the old action's Node 20 deprecation.
The project's build and Wrangler CLI still run on Node 26.12.1.

Biome remains at 2.4.15. The compatible-range refresh selected 2.6.3, which added
Markdown formatting across existing articles and deprecated the current config.
There was no Biome security finding, so that unrelated formatter migration is
excluded and the previously verified version is pinned explicitly.

## Temporary security overrides

`package.json` narrowly overrides three legacy development dependencies:

| Dependency | Patched version | Compatibility checked |
| --- | --- | --- |
| `tmp` below 0.2.7 | 0.2.7 | `fileSync`, private file mode, cleanup callback |
| `@lhci/cli > uuid` | 11.1.1 | CommonJS `v4()` used for report filenames |
| `basic-ftp` below 6.2.1 | 6.2.1 | CommonJS client methods consumed by `get-uri` |

These overrides avoid replacing Puppeteer or its schema validator with an
unsupported major version. Remove the overrides when upstream dependencies
request patched versions directly. The Lighthouse integration is exercised
by the complete seven-URL, three-run performance check.

## Remaining development-only findings

| Advisory | Dependency and exact scope | Current exposure and follow-up |
| --- | --- | --- |
| [GHSA-jmr9-qjv8-65gv](https://github.com/advisories/GHSA-jmr9-qjv8-65gv) | `@lhci/cli > lighthouse > puppeteer-core > @puppeteer/browsers > extract-zip@2.0.1` | Archive symlink traversal; no patched `extract-zip` release. This workflow uses installed Chrome, never browser archive downloads or arbitrary ZIP extraction. Update LHCI/Puppeteer when a compatible fix removes or patches this dependency. |
| [GHSA-7pqw-9j4j-h8q3](https://github.com/advisories/GHSA-7pqw-9j4j-h8q3) | Same `extract-zip@2.0.1` path | Archive symlink writes; same unused download/extraction path and follow-up. |
| [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) | `@lhci/cli > lighthouse > puppeteer-core > chromium-bidi > zod@3.25.76` | Collection-validation memory exhaustion in WebDriver BiDi. Lighthouse uses CDP, not BiDi; production Astro uses patched Zod 4.6.7. Wait for a compatible Puppeteer/BiDi upgrade rather than substituting Zod 4 into a Zod 3 consumer. |

These exceptions expire on **2027-01-26**. `security/audit-exceptions.json` matches
each GHSA, severity, package, exact installed version, and complete dependency path.
Any other package/version/path, new advisory, expired exception, or obsolete
exception fails `pnpm security:audit`. The separate `pnpm audit --prod` has no
exceptions. If browser downloading, WebDriver BiDi, remote targets, or untrusted
inputs are added to the Lighthouse workflow, reassess these exceptions first.

## Verification commands

Run inside a mise-enabled shell, or prefix commands with `mise exec --`:

```bash
pnpm install --frozen-lockfile
pnpm audit --prod
pnpm security:audit
pnpm test:security
pnpm security:secrets
pnpm check
pnpm lint
pnpm typecheck
pnpm build
pnpm perf:js-budget
pnpm perf:lhci
pnpm exec wrangler deploy --dry-run
```

Use `pnpm audit` for the unchanged, unfiltered full report. It exits nonzero
while the three upstream development findings remain. An audit or secret scan
is a bounded automated check, not a guarantee that every security issue is absent.

The migration comparison covered 45 HTML routes, their titles, canonical and
alternate locale links, heading IDs, main elements, and article export targets.
It preserved four link cards, four tables, and 106 labeled task checkboxes.
The updated Markdown typography corrected one opening curly quotation mark in
an English heading; its anchor ID is unchanged. Light/dark rendering and the
client-side language/article navigation were also checked in the browser.
