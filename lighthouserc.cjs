// @ts-check
"use strict";

// Thresholds calibrated for numberOfRuns:1 on GitHub Actions Ubuntu (2026-05).
// Single-run mode has high variance — thresholds are set conservatively to
// avoid flaky failures while still catching real regressions.
//
// Observed CI baseline (Ubuntu, 1 run):
//   Performance score: 0.68         → threshold 0.60
//   TBT:               ~363ms       → threshold 450ms
//   FCP/LCP:           sub-2s/sub-4s on CI (better than local Windows)
//   CLS:               0             (passes 0.05)
//   Accessibility:     1.0           (passes 0.95)
//   Best Practices:    1.0           (passes 0.95)
//   SEO:               1.0           (passes 0.95)

/** @type {import('@lhci/cli').LighthouseRcFile} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: [
        "http://localhost/",
        "http://localhost/about/",
        "http://localhost/articles/",
        "http://localhost/articles/tech-blog-performance-notes/",
        "http://localhost/works/",
        "http://localhost/en/",
        "http://localhost/en/about/",
      ],
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--no-sandbox --disable-dev-shm-usage",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.6 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 7000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
        "total-blocking-time": ["error", { maxNumericValue: 450 }],
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci",
    },
  },
};
