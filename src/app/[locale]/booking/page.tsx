import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";
import { siteConfig } from "@/data/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("booking");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BookingPage() {
  const t = await getTranslations("booking");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <CalendlyEmbed url={siteConfig.calendlyUrl} />
      </main>
    </>
  );
}
