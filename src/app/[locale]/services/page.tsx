import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BookingCTA } from "@/components/home/BookingCTA";
import { services } from "@/data/services";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("services");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={t(`items.${service.id}.name`)}
              description={t(`items.${service.id}.description`)}
              price={service.price}
              duration={service.duration}
            />
          ))}
        </div>

        <BookingCTA />
      </div>
    </>
  );
}
