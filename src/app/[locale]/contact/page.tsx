import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column — Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("address")}
              </p>
              <p className="text-light">{siteConfig.address}</p>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("phone")}
              </p>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-accent hover:text-accent-light transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("email")}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:text-accent-light transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("hours")}
              </p>
              <div className="space-y-3">
                {siteConfig.hours.map((entry) => (
                  <div key={entry.day} className="grid grid-cols-2 gap-4">
                    <span className="text-light font-body">{entry.day}</span>
                    <span className="text-muted font-body">{entry.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Google Maps */}
          <div className="rounded-lg overflow-hidden border border-muted/20 aspect-[4/3] md:aspect-auto md:min-h-[400px]">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("mapsLabel")}
              aria-label={t("mapsLabel")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
