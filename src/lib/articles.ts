import { type CollectionEntry, getCollection } from "astro:content";
import type { Locale } from "@/i18n/config";
import { getArticlePath } from "@/i18n/config";

export type ArticleEntry = CollectionEntry<"articles">;

const localePrefix = (locale: Locale) => `${locale}/`;

export const getSlugFromId = (id: string, locale: Locale) =>
  id.replace(new RegExp(`^${localePrefix(locale)}`), "").replace(/\.md$/, "");

export const isArticleInLocale = (article: ArticleEntry, locale: Locale) =>
  article.id.startsWith(localePrefix(locale));

export const isPublishedArticle = (article: ArticleEntry) => !article.data.draft;

const sortByPublishedAtDesc = (articles: ArticleEntry[]) =>
  articles.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

export const getPublishedArticles = async (locale: Locale) => {
  const articles = await getCollection(
    "articles",
    (article) => isArticleInLocale(article, locale) && isPublishedArticle(article),
  );

  return sortByPublishedAtDesc(articles);
};

export const getArticleBySlug = async (locale: Locale, slug: string) => {
  const articles = await getPublishedArticles(locale);
  return articles.find((article) => getSlugFromId(article.id, locale) === slug);
};

export const getPublishedArticleSlugs = async (locale: Locale) => {
  const articles = await getPublishedArticles(locale);
  return new Set(articles.map((article) => getSlugFromId(article.id, locale)));
};

export const getArticlesWithPaths = async (locale: Locale) => {
  const articles = await getPublishedArticles(locale);

  return articles.map((article) => {
    const slug = getSlugFromId(article.id, locale);

    return {
      article,
      slug,
      href: getArticlePath(locale, slug),
    };
  });
};
