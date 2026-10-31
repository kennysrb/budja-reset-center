import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { OpeningStatus } from "@/components/hours/OpeningStatus";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return createMetadata({
    locale,
    path: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tHours = await getTranslations("hours");
  const tCommon = await getTranslations("common");
  const tBooking = await getTranslations("bookingCta");

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
          <div data-reveal className="space-y-8">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("location")}
              </p>
              <p className="text-light">{t("locationValue")}</p>
              <p className="text-muted text-sm mt-1">{t("parking")}</p>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("instagram")}
              </p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                @{siteConfig.instagram.handle}
              </a>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("email")}
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-accent hover:text-accent-dark transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>

            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-2 font-body">
                {t("hours")}
              </p>
              <OpeningStatus className="mb-4" />
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-light font-body">{tHours("weekdays")}</span>
                  <span className="text-muted font-body">
                    {siteConfig.hours.opens}–{siteConfig.hours.closes}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="text-light font-body">{tHours("weekend")}</span>
                  <span className="text-muted font-body">{tHours("closed")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — How to book */}
          <div data-reveal="zoom" style={{ "--d": "150ms" } as React.CSSProperties} className="card p-8 md:p-12 flex flex-col justify-center">
            <h2 className="font-heading text-2xl md:text-3xl text-light uppercase mb-4">
              {tBooking("title")}
            </h2>
            <p className="text-muted mb-8">{tBooking("subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-gold text-center">
                {tCommon("bookAppointment")}
              </Link>
              <a
                href={siteConfig.instagram.dmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold text-center"
              >
                {tCommon("writeDm")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
