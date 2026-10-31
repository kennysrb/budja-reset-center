import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { businessJsonLd } from "@/lib/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/home/Hero";
import { InfoStrip } from "@/components/home/InfoStrip";
import { ServicesMarquee } from "@/components/home/ServicesMarquee";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AboutIntro } from "@/components/home/AboutIntro";
import { BookingCTA } from "@/components/home/BookingCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  return createMetadata({
    locale,
    path: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <JsonLd data={businessJsonLd(locale, t("metaDescription"))} />
      <Hero />
      <ServicesMarquee />
      <InfoStrip />
      <ServicesPreview />
      <AboutIntro />
      <GalleryPreview />
      <BookingCTA />
    </>
  );
}
