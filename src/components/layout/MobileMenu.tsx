"use client";

import { useTransition } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";
import { routing } from "@/i18n/routing";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-primary flex flex-col animate-fadeIn">
      {/* Header — mirrors navbar height and padding */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <Link
          href="/"
          onClick={onClose}
          className="font-heading text-accent text-xl font-bold tracking-widest uppercase"
        >
          {t("logo")}
        </Link>
        <button
          onClick={onClose}
          aria-label={tCommon("closeMenu")}
          className="flex flex-col items-center justify-center w-9 h-9 text-light hover:text-accent transition-colors duration-200"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col items-center justify-center flex-1 gap-6">
        {siteConfig.navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-heading text-4xl uppercase tracking-widest transition-colors duration-200 ${
              pathname === link.href
                ? "text-white"
                : "text-light/40 hover:text-white"
            }`}
            onClick={onClose}
          >
            {t(link.key)}
          </Link>
        ))}
      </nav>

      {/* Bottom — locale pills + Book Appointment */}
      <div className="flex flex-col items-center gap-5 pb-12">
        {/* Language pills */}
        <div className="flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              disabled={isPending}
              className={`px-3 py-1 rounded-full text-xs uppercase tracking-widest font-medium transition-colors duration-200 disabled:opacity-50 ${
                loc === locale
                  ? "bg-accent text-primary"
                  : "border border-muted/30 text-muted hover:text-white hover:border-white/30"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* Book Appointment */}
        <Link
          href="/booking"
          onClick={onClose}
          className="bg-accent text-primary font-bold uppercase tracking-widest text-sm px-8 py-3 rounded hover:bg-accent-light transition-colors duration-200"
        >
          {tCommon("bookAppointment")}
        </Link>
      </div>
    </div>
  );
}
