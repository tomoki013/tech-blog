import type { Locale } from "@/i18n/config";
import { getArticlePath } from "@/i18n/config";
import type { ArticleEntry } from "@/lib/articles";
import { absoluteUrl } from "@/lib/seo";

/**
 * Machine-readable representations of an article, shared by the `.md` / `.json`
 * endpoints, the article export UI, the WebMCP tool, and `llms-full.txt`.
 */

const toIso = (date: Date | undefined) => date?.toISOString();

/** YAML-escape a scalar string for frontmatter (always quote, escape quotes/backslashes). */
const yamlString = (value: string) => `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;

const yamlStringList = (values: string[]) =>
  `[${values.map((value) => yamlString(value)).join(", ")}]`;

export interface ArticleJson {
  title: string;
  description: string;
  locale: Locale;
  slug: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  projectIds: string[];
  markdown: string;
}

export const getArticleUrl = (locale: Locale, slug: string) =>
  absoluteUrl(getArticlePath(locale, slug));

/**
 * Reconstruct a self-contained Markdown document: YAML frontmatter rebuilt from
 * the validated schema data, followed by the raw Markdown body (`article.body`,
 * provided by the glob content loader — no rendering required).
 */
export const buildArticleMarkdown = (article: ArticleEntry, locale: Locale, slug: string) => {
  const { data } = article;
  const lines = [
    "---",
    `title: ${yamlString(data.title)}`,
    `description: ${yamlString(data.description)}`,
    `lang: ${locale}`,
    `url: ${yamlString(getArticleUrl(locale, slug))}`,
    `publishedAt: ${yamlString(data.publishedAt.toISOString())}`,
  ];
  if (data.updatedAt) lines.push(`updatedAt: ${yamlString(data.updatedAt.toISOString())}`);
  if (data.tags.length > 0) lines.push(`tags: ${yamlStringList(data.tags)}`);
  if (data.projectIds.length > 0) lines.push(`projectIds: ${yamlStringList(data.projectIds)}`);
  lines.push("---", "");

  const body = (article.body ?? "").trim();
  return `${lines.join("\n")}\n${body}\n`;
};

export const buildArticleJson = (
  article: ArticleEntry,
  locale: Locale,
  slug: string,
): ArticleJson => {
  const { data } = article;
  return {
    title: data.title,
    description: data.description,
    locale,
    slug,
    url: getArticleUrl(locale, slug),
    publishedAt: data.publishedAt.toISOString(),
    updatedAt: toIso(data.updatedAt),
    tags: data.tags,
    projectIds: data.projectIds,
    markdown: (article.body ?? "").trim(),
  };
};
