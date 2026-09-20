export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

/** Short label shown inside the switcher. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export const htmlLang: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

/** English lives at the root, Chinese under /zh. */
export function localePath(locale: Locale, path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/" : clean;
  return clean === "/" ? "/zh" : `/zh${clean}`;
}

/** Map the current pathname to the same page in the other locale. */
export function switchLocalePath(pathname: string, target: Locale) {
  const withoutLocale = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  return localePath(target, withoutLocale);
}
