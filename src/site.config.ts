import type { Locale } from "@/i18n/config";

const normalizeSiteUrl = (url: string) => url.replace(/\/$/, "");

export const siteConfig = {
  url: normalizeSiteUrl(import.meta.env.PUBLIC_SITE_URL ?? "https://example.com"),
  name: {
    ja: "ともきちのエンジニア成長記",
    en: "Tomokichi's Engineering Growth Log",
  },
  description: {
    ja: "個人開発、Web開発、AI活用、設計、運用改善の試行錯誤を記録する、軽量で高速な個人技術ブログです。",
    en: "A lightweight personal engineering blog about indie development, web engineering, AI-assisted work, product design, and operational improvements.",
  },
  author: "Tomokichi",
  bio: {
    ja: "Webエンジニア。個人開発、Web開発、AI活用、プロダクト設計、運用改善などを中心に活動しています。技術の力で日常を少し便利に、面白くすることを目指しています。",
    en: "Web Developer. Passionate about personal development, Web development, AI utilization, product design, and operational improvement.",
  },
  profileImage: "/icon-256.webp",
  profileImageSmall: "/icon-64.webp",
  ogImage: "/og/default.png",
} satisfies {
  url: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  author: string;
  bio: Record<Locale, string>;
  profileImage: string;
  profileImageSmall: string;
  ogImage: string;
};
