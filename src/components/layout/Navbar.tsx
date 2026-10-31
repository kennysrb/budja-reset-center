"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-lg"
            : "bg-primary/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 xl:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-heading text-accent text-xl font-bold tracking-widest uppercase"
            >
              {t("logo")}
            </Link>

            {/* Desktop Nav Links — visible from lg (1024px) up */}
            <div className="hidden lg:flex items-center gap-6">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest whitespace-nowrap transition-colors duration-200 font-medium ${
                    pathname === link.href
                      ? "text-white border-b border-white pb-0.5"
                      : "text-light/40 hover:text-white"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
              {/* Locale switcher — desktop only */}
              <div className="hidden lg:block">
                <LocaleSwitcher />
              </div>

              {/* Book Appointment — desktop only */}
              <Link
                href="/booking"
                className="hidden lg:inline-block bg-accent text-primary text-xs font-bold uppercase tracking-widest whitespace-nowrap px-5 py-2.5 rounded hover:bg-accent-light transition-colors duration-200"
              >
                {tCommon("bookAppointment")}
              </Link>

              {/* Hamburger — shown below lg */}
              <button
                className="lg:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={
                  mobileMenuOpen ? tCommon("closeMenu") : tCommon("openMenu")
                }
                aria-expanded={mobileMenuOpen}
              >
                <span
                  className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-light transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
