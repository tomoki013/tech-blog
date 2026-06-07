import type { APIRoute } from "astro";
import type { Locale } from "@/i18n/config";
import { buildArticleMarkdown } from "@/lib/article-export";
import { getArticlesWithPaths } from "@/lib/articles";
import { siteConfig } from "@/site.config";

const renderLocaleSection = async (locale: Locale, heading: string) => {
  const articles = await getArticlesWithPaths(locale);
  const body = articles
    .map(({ article, slug }) => buildArticleMarkdown(article, locale, slug).trim())
    .join("\n\n---\n\n");
  return `# ${heading}\n\n${body}`;
};

export const GET: APIRoute = async () => {
  const [ja, en] = await Promise.all([
    renderLocaleSection("ja", `${siteConfig.name.ja} — Articles (Japanese)`),
    renderLocaleSection("en", `${siteConfig.name.en} — Articles (English)`),
  ]);

  const text = `${ja}\n\n===\n\n${en}\n`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
