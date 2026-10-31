import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AboutIntro } from "@/components/home/AboutIntro";
import { BookingCTA } from "@/components/home/BookingCTA";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("home");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <GalleryPreview />
      <AboutIntro />
      <BookingCTA />
    </>
  );
}
