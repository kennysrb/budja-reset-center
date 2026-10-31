import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { BookingCTA } from "@/components/home/BookingCTA";
import { products } from "@/data/products";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProductsPage() {
  const t = await getTranslations("products");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          title={t("sectionTitle")}
          subtitle={t("sectionSubtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={t(`items.${product.id}.name`)}
              description={t(`items.${product.id}.description`)}
              price={product.price}
              image={product.image}
              inStoreBadge={t("inStoreBadge")}
            />
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-muted text-sm mb-6 font-body">{t("inStoreNote")}</p>
          <Button variant="outline" href="/contact">
            {tCommon("contactUs")}
          </Button>
        </div>

        <BookingCTA />
      </div>
    </>
  );
}
