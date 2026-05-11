import type { APIRoute } from "astro";
import { getArticlePath, getRssPath } from "@/i18n/config";
import { getArticlesWithPaths } from "@/lib/articles";
import { absoluteUrl, toRfc822, xmlEscape } from "@/lib/seo";
import { siteConfig } from "@/site.config";

export const GET: APIRoute = async () => {
  const locale = "ja";
  const articles = await getArticlesWithPaths(locale);

  const items = articles
    .map(({ article, slug }) => {
      const link = absoluteUrl(getArticlePath(locale, slug));
      return `
        <item>
          <title>${xmlEscape(article.data.title)}</title>
          <link>${link}</link>
          <guid>${link}</guid>
          <pubDate>${toRfc822(article.data.publishedAt)}</pubDate>
          <description>${xmlEscape(article.data.description)}</description>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(siteConfig.name[locale])}</title>
    <link>${absoluteUrl("/")}</link>
    <description>${xmlEscape(siteConfig.description[locale])}</description>
    <language>ja</language>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${absoluteUrl(getRssPath(locale))}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
};
