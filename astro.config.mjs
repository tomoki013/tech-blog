// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_URL ?? "https://example.com";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "always",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "tap",
  },
  markdown: {
    rehypePlugins: [
      () => async (tree) => {
        const ogCache = new Map();

        async function getOgData(url) {
          if (ogCache.has(url)) return ogCache.get(url);
          try {
            const res = await fetch(url, {
              headers: { "User-Agent": "Mozilla/5.0 (compatible; GeminiBot/1.0)" },
              signal: AbortSignal.timeout(5000),
            });
            if (!res.ok) return null;
            const html = await res.text();
            const title =
              html.match(
                /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']+)["']/i,
              )?.[1] ||
              html.match(
                /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:title["']/i,
              )?.[1] ||
              html.match(/<title>([^<]+)<\/title>/i)?.[1];
            const description =
              html.match(
                /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i,
              )?.[1] ||
              html.match(
                /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["']/i,
              )?.[1] ||
              html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1];
            const image =
              html.match(
                /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
              )?.[1] ||
              html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i)?.[1];
            const data = title
              ? { title, description, image, hostname: new URL(url).hostname }
              : null;
            ogCache.set(url, data);
            return data;
          } catch (_e) {
            ogCache.set(url, null);
            return null;
          }
        }

        async function traverse(node) {
          if (!node?.children) return;

          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child.type === "element") {
              // Standalone Link Card Detection
              let urlToFetch = null;

              if (child.tagName === "p" && child.children.length === 1) {
                const soloChild = child.children[0];
                if (soloChild.tagName === "a") {
                  const href = soloChild.properties.href;
                  if (
                    typeof href === "string" &&
                    (href.startsWith("http") || href.startsWith("//"))
                  ) {
                    urlToFetch = href;
                  }
                } else if (soloChild.type === "text") {
                  const text = soloChild.value.trim();
                  if (/^https?:\/\/[^\s]+$/.test(text)) {
                    urlToFetch = text;
                  }
                }
              }

              if (urlToFetch) {
                const og = await getOgData(urlToFetch);
                if (og) {
                  node.children[i] = {
                    type: "element",
                    tagName: "a",
                    properties: {
                      href: urlToFetch,
                      className: ["link-card"],
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "div",
                        properties: { className: ["link-card__body"] },
                        children: [
                          {
                            type: "element",
                            tagName: "span",
                            properties: { className: ["link-card__title"] },
                            children: [{ type: "text", value: og.title }],
                          },
                          og.description
                            ? {
                                type: "element",
                                tagName: "p",
                                properties: { className: ["link-card__description"] },
                                children: [{ type: "text", value: og.description }],
                              }
                            : null,
                          {
                            type: "element",
                            tagName: "span",
                            properties: { className: ["link-card__hostname"] },
                            children: [{ type: "text", value: og.hostname }],
                          },
                        ].filter(Boolean),
                      },
                      og.image
                        ? {
                            type: "element",
                            tagName: "div",
                            properties: { className: ["link-card__image"] },
                            children: [
                              {
                                type: "element",
                                tagName: "img",
                                properties: {
                                  src: og.image,
                                  alt: "",
                                  loading: "lazy",
                                  decoding: "async",
                                  referrerPolicy: "no-referrer",
                                },
                              },
                            ],
                          }
                        : null,
                    ].filter(Boolean),
                  };
                  continue;
                }
              }

              // Normal Table/Link/List handling
              if (child.tagName === "table") {
                const wrapper = {
                  type: "element",
                  tagName: "div",
                  properties: { className: ["table-wrapper"] },
                  children: [child],
                };
                node.children[i] = wrapper;
                child.properties.className = [...(child.properties.className || []), "md-table"];
                continue;
              }

              if (child.tagName === "a") {
                const href = child.properties.href;
                const isExternal =
                  typeof href === "string" && (href.startsWith("http") || href.startsWith("//"));
                if (isExternal) {
                  child.properties.target = "_blank";
                  child.properties.rel = "noopener noreferrer";
                  child.properties.className = [
                    ...(child.properties.className || []),
                    "external-link",
                  ];
                }
              }

              if (child.tagName === "li") {
                child.properties.className = [...(child.properties.className || []), "md-li"];
              }
            }
            await traverse(child);
          }
        }
        await traverse(tree);
      },
    ],
  },
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
