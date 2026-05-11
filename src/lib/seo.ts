import { siteConfig } from "@/site.config";

export const absoluteUrl = (path: string) => new URL(path, `${siteConfig.url}/`).toString();

export const xmlEscape = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const formatDate = (date: Date, locale: "ja" | "en") =>
  new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);

export const toRfc822 = (date: Date) => date.toUTCString();
export const toDateOnly = (date: Date) => date.toISOString().slice(0, 10);
