"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { galleryImages } from "@/data/gallery";
import { CategoryFilter } from "./CategoryFilter";

export function GalleryGrid() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const uniqueCategoryValues = Array.from(
    new Set(galleryImages.map((image) => image.category)),
  );

  const categories = [
    { value: "all", label: t("categories.all") },
    ...uniqueCategoryValues.map((cat) => ({
      value: cat,
      label: t(`categories.${cat}`),
    })),
  ];

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((image) => image.category === activeCategory);

  const slides = filteredImages.map((image) => ({
    src: image.src,
    alt: t(`images.${image.id}`),
  }));

  return (
    <>
      <div>
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              <Image
                src={image.src}
                alt={t(`images.${image.id}`)}
                width={600}
                height={400}
                className="object-cover w-full h-72 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Counter]}
        controller={{ closeOnBackdropClick: true }}
        styles={{ root: { "--yarl__color_backdrop": "rgba(0, 0, 0, 0.9)" } }}
      />
    </>
  );
}
