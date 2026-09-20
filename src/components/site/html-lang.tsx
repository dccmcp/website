"use client";

import { useEffect } from "react";
import { htmlLang, type Locale } from "@/i18n/config";

/**
 * The App Router only allows one root layout, so the <html lang> attribute is
 * declared once as "en". This corrects it for the Chinese route tree on the
 * client. Screen readers and JS-executing crawlers then get the right language.
 *
 * A follow-up can move to multiple root layouts (one per locale) to set the
 * attribute server-side.
 */
export function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  return null;
}
