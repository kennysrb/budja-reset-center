import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function GalleryPreview() {
  const t = await getTranslations("galleryPreview");
  const tGallery = await getTranslations("gallery");
  const tCommon = await getTranslations("common");

  const previewImages = galleryImages.slice(0, 6);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((image, i) => (
            <div
              key={image.id}
              data-reveal="zoom"
              style={{ "--d": `${(i % 3) * 110}ms` } as React.CSSProperties}
              className="group overflow-hidden rounded-3xl shadow-sm hover:shadow-xl hover:shadow-espresso/15 transition-shadow duration-500"
            >
              <Image
                src={image.src}
                alt={tGallery(`images.${image.id}`)}
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover w-full h-48 md:h-72 transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Button variant="outline" size="md" href="/gallery">
            {tCommon("viewFullGallery")}
          </Button>
        </div>
      </div>
    </section>
  );
}
