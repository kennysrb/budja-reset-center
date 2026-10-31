import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Budja Reset Center",
  tagline: "Masaža · ventuze · analiza drže",
  // TODO(client): production domain. Set NEXT_PUBLIC_SITE_URL in the deployment env.
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  email: "info.resetcenter@gmail.com",
  locality: "Škofljica",
  country: "SI",
  instagram: {
    handle: "budja_reset_center",
    url: "https://www.instagram.com/budja_reset_center/",
    dmUrl: "https://ig.me/m/budja_reset_center",
  },
  hours: {
    days: [1, 2, 3, 4, 5],
    opens: "16:30",
    closes: "20:00",
    timeZone: "Europe/Ljubljana",
  },
  // Online booking (Calendly). Empty values show the "booking coming soon" state with an
  // Instagram DM fallback. See README → "Online booking" for setup.
  calendly: {
    url: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
    eventUrls: {
      30: process.env.NEXT_PUBLIC_CALENDLY_URL_30 || undefined,
      60: process.env.NEXT_PUBLIC_CALENDLY_URL_60 || undefined,
      90: process.env.NEXT_PUBLIC_CALENDLY_URL_90 || undefined,
    },
  },
  navLinks: [
    { key: "home", href: "/" },
    { key: "services", href: "/services" },
    { key: "about", href: "/about" },
    { key: "faq", href: "/faq" },
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ],
};
