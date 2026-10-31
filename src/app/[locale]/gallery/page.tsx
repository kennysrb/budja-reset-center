import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gallery");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function GalleryPage() {
  const t = await getTranslations("gallery");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />
        <GalleryGrid />
      </div>
    </>
  );
}
