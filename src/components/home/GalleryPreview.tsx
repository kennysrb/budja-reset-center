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
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={image.src}
                alt={tGallery(`images.${image.id}`)}
                width={600}
                height={400}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover w-full h-64 rounded-lg"
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
