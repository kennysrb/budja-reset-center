import { GalleryImage } from "@/types";

// TODO(client): stock placeholders — replace with the studio's own photos.
const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&auto=format&fit=crop&q=80`;

export const galleryImages: GalleryImage[] = [
  { id: "backMassage", src: unsplash("1519823551278-64ac92734fb1"), category: "treatments" },
  { id: "shoulderMassage", src: unsplash("1519824145371-296894a0daa9"), category: "treatments" },
  { id: "legMassage", src: unsplash("1611073615830-9f76902c10fe"), category: "treatments" },
  { id: "oilMassage", src: unsplash("1544161515-4ab6ce6db874"), category: "treatments" },
  { id: "towels", src: unsplash("1540555700478-4be289fbecef"), category: "studio" },
  { id: "oils", src: unsplash("1556760544-74068565f05c"), category: "studio" },
  { id: "candles", src: unsplash("1620733723572-11c53f73a416"), category: "studio" },
  { id: "oilDrop", src: unsplash("1515377905703-c4788e51af15"), category: "studio" },
];
