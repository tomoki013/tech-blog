import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const GET: APIRoute = () => {
  const text = `# ${siteConfig.name.ja}

${siteConfig.description.ja}

## Languages

- Japanese: ${absoluteUrl("/")}
- English: ${absoluteUrl("/en/")}

## Main sections

- Japanese articles: ${absoluteUrl("/articles/")}
- English articles: ${absoluteUrl("/en/articles/")}
- Archive: ${absoluteUrl("/archived/")}
- About: ${absoluteUrl("/about/")}
- Privacy Policy: ${absoluteUrl("/privacy/")}
- Disclaimer: ${absoluteUrl("/disclaimer/")}
- RSS Japanese: ${absoluteUrl("/rss.xml")}
- RSS English: ${absoluteUrl("/en/rss.xml")}

## Content policy

This site is a personal engineering blog about web development, AI-assisted development, product design, infrastructure, operations, and learning notes.
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
