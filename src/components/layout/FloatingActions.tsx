"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";

export function FloatingActions() {
  const t = useTranslations("common");
  const pathname = usePathname();
  const showBook = pathname !== "/booking";
  const showDm = pathname !== "/contact";

  if (!showBook && !showDm) return null;

  return (
    <div
      className="fixed right-4 z-40 flex items-center gap-3"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      {showBook && (
        // Desktop has "Book" in the header; mobile gets it here.
        <Link
          href="/booking"
          className="lg:hidden animate-float-in [--d:800ms] bg-accent text-primary text-xs font-semibold uppercase tracking-widest px-5 h-12 inline-flex items-center rounded-full shadow-lg shadow-espresso/20 hover:bg-accent-dark transition-colors duration-200"
        >
          {t("bookAppointment")}
        </Link>
      )}
      {showDm && (
        <a
          href={siteConfig.instagram.dmUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("writeDm")}
          title={t("writeDm")}
          className="animate-float-in [--d:1000ms] w-12 h-12 rounded-full bg-secondary text-accent border border-accent/30 shadow-lg shadow-espresso/20 flex items-center justify-center hover:bg-accent hover:text-primary hover:scale-110 transition-all duration-300"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      )}
    </div>
  );
}
