import { siteConfig } from "@/data/siteConfig";
import { services } from "@/data/services";
import { localizedUrl } from "@/lib/metadata";

const SCHEMA_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** HealthAndBeautyBusiness. No phone or street address: we don't have them, so they're omitted. */
export function businessJsonLd(locale: string, description: string) {
  const prices = services.flatMap((s) => Object.values(s.prices));
  const { hours } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.name,
    description,
    url: localizedUrl(locale, "/"),
    email: siteConfig.email,
    // Town + country only (no street address).
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.locality,
      addressCountry: siteConfig.country,
    },
    areaServed: { "@type": "Country", name: "Slovenia" },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: hours.days.map((d) => SCHEMA_DAYS[d - 1]),
        opens: hours.opens,
        closes: hours.closes,
      },
    ],
    priceRange: `${Math.min(...prices)}–${Math.max(...prices)} €`,
    currenciesAccepted: "EUR",
    sameAs: [siteConfig.instagram.url],
    founder: { "@type": "Person", name: siteConfig.therapist, jobTitle: "Massage therapist" },
  };
}

export function faqJsonLd(items: { q: string; a: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a.join(" ") },
    })),
  };
}
