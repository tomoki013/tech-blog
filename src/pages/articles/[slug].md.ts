import type { APIRoute, GetStaticPaths } from "astro";
import { buildArticleMarkdown } from "@/lib/article-export";
import { getPublishedArticles, getSlugFromId } from "@/lib/articles";

const locale = "ja";

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getPublishedArticles(locale);
  return articles.map((article) => {
    const slug = getSlugFromId(article.id, locale);
    return { params: { slug }, props: { article, slug } };
  });
};

export const GET: APIRoute = ({ props }) => {
  const { article, slug } = props as {
    article: Awaited<ReturnType<typeof getPublishedArticles>>[number];
    slug: string;
  };

  return new Response(buildArticleMarkdown(article, locale, slug), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
