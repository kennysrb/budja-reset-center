export type Duration = 30 | 60 | 90;

export interface Service {
  id: string;
  prices: Partial<Record<Duration, number>>;
  image: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  category: string;
}

export interface TeamMember {
  id: string;
  image: string;
}

export interface OpeningHours {
  /** ISO weekdays: 1 = Monday … 7 = Sunday */
  days: number[];
  /** "HH:MM", local time in `timeZone` */
  opens: string;
  closes: string;
  timeZone: string;
}

export interface SiteConfig {
  name: string;
  therapist: string;
  tagline: string;
  siteUrl: string;
  email: string;
  locality: string;
  country: string;
  instagram: { handle: string; url: string; dmUrl: string };
  hours: OpeningHours;
  calendly: {
    /** Fallback event (or Calendly profile page) */
    url: string;
    /** Optional per-length event types; the booking page picks the one matching the selection */
    eventUrls: Partial<Record<Duration, string>>;
  };
  navLinks: { key: string; href: string }[];
}
