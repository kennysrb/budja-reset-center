import { getTranslations } from "next-intl/server";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";

export async function ServicesPreview() {
  const t = await getTranslations("servicesPreview");
  const tServices = await getTranslations("services");
  const tCommon = await getTranslations("common");

  const previewServices = services.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewServices.map((service) => (
            <ServiceCard
              key={service.id}
              name={tServices(`items.${service.id}.name`)}
              description={tServices(`items.${service.id}.description`)}
              price={service.price}
              duration={service.duration}
            />
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="md" href="/services">
            {tCommon("viewAllServices")}
          </Button>
        </div>
      </div>
    </section>
  );
}
