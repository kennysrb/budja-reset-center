import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { routing } from "@/i18n/routing";

const OG_LOCALES: Record<string, string> = { sl: "sl_SI", en: "en_US" };

/** Absolute URL for `path` in `locale` (default locale has no prefix: localePrefix "as-needed"). */
export function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const suffix = path === "/" ? "" : path;
  return `${siteConfig.siteUrl}${prefix}${suffix}` || `${siteConfig.siteUrl}/`;
}

/** hreflang map for a path: every locale + x-default (Slovenian). */
export function languageAlternates(path: string) {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

export function createMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedUrl(locale, path);
  // Absolute: title.template doesn't reach pages in the layout's own segment (the home page).
  const fullTitle = `${title} | ${siteConfig.name}`;
  const image = {
    url: localizedUrl(locale, "/og-image"),
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${siteConfig.locality}`,
  };
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      locale: OG_LOCALES[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
