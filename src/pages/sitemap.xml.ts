import type { APIRoute } from "astro";
import {
  getAboutPath,
  getArchivedPath,
  getArticlePath,
  getArticlesPath,
  getDisclaimerPath,
  getHomePath,
  getPrivacyPath,
} from "@/i18n/config";
import { getArticlesWithPaths } from "@/lib/articles";
import { absoluteUrl, toDateOnly } from "@/lib/seo";

export const GET: APIRoute = async () => {
  const jaArticles = await getArticlesWithPaths("ja");
  const enArticles = await getArticlesWithPaths("en");

  const staticPages = [
    { loc: getHomePath("ja"), lastmod: undefined },
    { loc: getArticlesPath("ja"), lastmod: undefined },
    { loc: getArchivedPath("ja"), lastmod: undefined },
    { loc: getAboutPath("ja"), lastmod: undefined },
    { loc: getPrivacyPath("ja"), lastmod: undefined },
    { loc: getDisclaimerPath("ja"), lastmod: undefined },
    { loc: getHomePath("en"), lastmod: undefined },
    { loc: getArticlesPath("en"), lastmod: undefined },
    { loc: getArchivedPath("en"), lastmod: undefined },
    { loc: getAboutPath("en"), lastmod: undefined },
    { loc: getPrivacyPath("en"), lastmod: undefined },
    { loc: getDisclaimerPath("en"), lastmod: undefined },
  ];

  const articlePages = [
    ...jaArticles.map(({ article, slug }) => ({
      loc: getArticlePath("ja", slug),
      lastmod: toDateOnly(article.data.updatedAt ?? article.data.publishedAt),
    })),
    ...enArticles.map(({ article, slug }) => ({
      loc: getArticlePath("en", slug),
      lastmod: toDateOnly(article.data.updatedAt ?? article.data.publishedAt),
    })),
  ];

  const urls = [...staticPages, ...articlePages]
    .map(({ loc, lastmod }) => {
      const lastmodTag = lastmod ? `<lastmod>${lastmod}</lastmod>` : "";
      return `<url><loc>${absoluteUrl(loc)}</loc>${lastmodTag}</url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
