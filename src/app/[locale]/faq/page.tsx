import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { FaqList, FAQ_IDS } from "@/components/faq/FaqList";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/structuredData";
import { BookingCTA } from "@/components/home/BookingCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faq" });
  return createMetadata({
    locale,
    path: "/faq",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FaqPage() {
  const t = await getTranslations("faq");

  const items = FAQ_IDS.map((id) => ({
    q: t(`items.${id}.q`),
    a: t.raw(`items.${id}.a`) as string[],
  }));

  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <FaqList />
      </div>

      <BookingCTA />
    </>
  );
}
