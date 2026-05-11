import type { Locale } from "@/i18n/config";

const normalizeSiteUrl = (url: string) => url.replace(/\/$/, "");

export const siteConfig = {
  url: normalizeSiteUrl(import.meta.env.PUBLIC_SITE_URL ?? "https://example.com"),
  name: {
    ja: "ともきちのエンジニア成長記",
    en: "Tomokichi's Engineering Growth Log",
  },
  description: {
    ja: "エンジニアとしての学習、開発、試行錯誤を記録する個人技術ブログです。",
    en: "A personal engineering blog about learning, building, and growing as a developer.",
  },
  author: "Tomokichi",
  profileImage: "/icon.png",
  ogImage: "/og/default.png",
} satisfies {
  url: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  author: string;
  profileImage: string;
  ogImage: string;
};
