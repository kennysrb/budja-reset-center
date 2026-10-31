"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
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
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-primary/95 backdrop-blur-md shadow-sm border-accent/15"
            : "bg-primary/80 backdrop-blur-sm border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 xl:h-20">
            {/* Logo */}
            <Link href="/" aria-label={t("logo")}>
              <Logo />
            </Link>

            {/* Desktop Nav Links — visible from lg (1024px) up */}
            <div className="hidden lg:flex items-center gap-7">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-light border-b border-accent pb-0.5"
                      : "text-light/60 hover:text-light"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Locale switcher — desktop only */}
              <div className="hidden lg:block">
                <LocaleSwitcher />
              </div>

              <ThemeToggle />

              {/* Book Appointment — desktop only */}
              <Link
                href="/booking"
                className="hidden lg:inline-block bg-accent text-primary text-xs font-semibold uppercase tracking-widest whitespace-nowrap px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors duration-200"
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
                  className={`block w-6 h-px bg-light transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-px bg-light transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-6 h-px bg-light transition-all duration-300 ${
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
