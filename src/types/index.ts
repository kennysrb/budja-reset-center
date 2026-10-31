export interface Service {
  id: string;
  price: number;
  duration: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
}

export interface Product {
  id: string;
  price: number;
  image: string;
}

export interface TeamMember {
  id: string;
  image: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  hours: { day: string; hours: string }[];
  social: { platform: string; url: string }[];
  calendlyUrl: string;
  googleMapsEmbedUrl: string;
  navLinks: { key: string; href: string }[];
}
