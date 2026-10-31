import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Gentleman's Choice",
  tagline: "Precision Cuts. Premium Experience.",
  phone: "+386 1 234 5678",
  email: "info@gentlemanschoice.si",
  address: "Čopova ulica 5, 1000 Ljubljana, Slovenia",
  hours: [
    { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ],
  social: [
    { platform: "Instagram", url: "https://instagram.com/gentlemanschoice" },
    { platform: "Facebook", url: "https://facebook.com/gentlemanschoice" },
  ],
  calendlyUrl: "https://calendly.com/koviljkagrabez/30min",
  // Replace with your real Google Maps embed URL (Share → Embed a map → copy src URL)
  googleMapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.5!2d14.5058!3d46.0569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDYuMDU2OSwgMTQuNTA1OA!5e0!3m2!1sen!2ssi!4v1617000000000!5m2!1sen!2ssi",
  navLinks: [
    { key: "home", href: "/" },
    { key: "services", href: "/services" },
    { key: "gallery", href: "/gallery" },
    { key: "about", href: "/about" },
    { key: "contact", href: "/contact" },
    { key: "products", href: "/products" },
  ],
};
