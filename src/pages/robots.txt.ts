import type { APIRoute } from "astro";
import { absoluteUrl } from "@/lib/seo";

export const GET: APIRoute = () => {
  const text = `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("/sitemap.xml")}
`;

  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
