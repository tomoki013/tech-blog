export const defaultLocale = "ja" as const;
export const locales = ["ja", "en"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
};

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const getHomePath = (locale: Locale) => (locale === defaultLocale ? "/" : `/${locale}/`);
export const getArticlesPath = (locale: Locale) =>
  locale === defaultLocale ? "/articles/" : `/${locale}/articles/`;
export const getAboutPath = (locale: Locale) =>
  locale === defaultLocale ? "/about/" : `/${locale}/about/`;
export const getArchivedPath = (locale: Locale) =>
  locale === defaultLocale ? "/archived/" : `/${locale}/archived/`;
export const getPrivacyPath = (locale: Locale) =>
  locale === defaultLocale ? "/privacy/" : `/${locale}/privacy/`;
export const getDisclaimerPath = (locale: Locale) =>
  locale === defaultLocale ? "/disclaimer/" : `/${locale}/disclaimer/`;
export const getLicensePath = (locale: Locale) =>
  locale === defaultLocale ? "/license/" : `/${locale}/license/`;
export const getArticlePath = (locale: Locale, slug: string) =>
  locale === defaultLocale ? `/articles/${slug}/` : `/${locale}/articles/${slug}/`;
export const getRssPath = (locale: Locale) =>
  locale === defaultLocale ? "/rss.xml" : `/${locale}/rss.xml`;
