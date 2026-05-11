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
  bio: {
    ja: "Webエンジニア。個人開発、Web開発、AI活用、プロダクト設計、運用改善などを中心に活動しています。技術の力で日常を少し便利に、面白くすることを目指しています。",
    en: "Web Developer. Passionate about personal development, Web development, AI utilization, product design, and operational improvement.",
  },
  profileImage: "/icon-256.webp",
  ogImage: "/og/default.png",
} satisfies {
  url: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  author: string;
  bio: Record<Locale, string>;
  profileImage: string;
  ogImage: string;
};
