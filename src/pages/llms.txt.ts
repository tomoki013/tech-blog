import type { APIRoute } from "astro";
import type { Locale } from "@/i18n/config";
import { getArticlesWithPaths } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/site.config";

const articleMarkdownUrl = (locale: Locale, slug: string) =>
  absoluteUrl(locale === "ja" ? `/articles/${slug}.md` : `/en/articles/${slug}.md`);

const renderArticleList = async (locale: Locale) => {
  const articles = await getArticlesWithPaths(locale);
  return articles
    .map(
      ({ article, slug }) =>
        `- [${article.data.title}](${articleMarkdownUrl(locale, slug)}): ${article.data.description}`,
    )
    .join("\n");
};

export const GET: APIRoute = async () => {
  const [jaArticles, enArticles] = await Promise.all([
    renderArticleList("ja"),
    renderArticleList("en"),
  ]);

  const text = `# ${siteConfig.name.ja}

> ${siteConfig.description.ja}

This is a personal engineering blog about indie development, web development, AI-assisted development, product design, infrastructure, operations, and learning notes. Japanese (\`/\`) and English (\`/en/\`) versions are kept in sync. Every article is also available as raw Markdown (append \`.md\` to the article URL) and as JSON (append \`.json\`).

## Articles (Japanese)

${jaArticles}

## Articles (English)

${enArticles}

## Pages

- [Home (Japanese)](${absoluteUrl("/")}): Site top.
- [Home (English)](${absoluteUrl("/en/")}): Site top, English.
- [About](${absoluteUrl("/about/")}): Author profile and focus areas.
- [Works](${absoluteUrl("/works/")}): Projects and case studies.
- [Archive](${absoluteUrl("/archived/")}): Older posts.

## Feeds

- [RSS (Japanese)](${absoluteUrl("/rss.xml")})
- [RSS (English)](${absoluteUrl("/en/rss.xml")})

## Optional

- [llms-full.txt](${absoluteUrl("/llms-full.txt")}): Full Markdown of every published article, concatenated.
- [Privacy Policy](${absoluteUrl("/privacy/")})
- [Disclaimer](${absoluteUrl("/disclaimer/")})
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
