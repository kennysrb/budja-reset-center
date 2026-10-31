import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";
import { Logo } from "@/components/ui/Logo";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tContact = await getTranslations("contact");
  const tHours = await getTranslations("hours");
  const tCommon = await getTranslations("common");

  return (
    <footer className="bg-secondary text-light border-t border-accent/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 lg:pb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Column 1: Logo + tagline + Instagram */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" aria-label={tNav("logo")} className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-muted font-body mb-5">{t("tagline")}</p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tCommon("instagram")} @${siteConfig.instagram.handle}`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-accent/30 text-accent hover:bg-accent hover:text-primary transition-colors duration-200"
            >
              <svg
                width="18"
                height="18"
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
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="font-heading text-light text-sm uppercase tracking-[0.25em] mb-5">
              {t("quickLinks")}
            </h2>
            <ul className="space-y-2.5">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors duration-200 font-body text-sm"
                  >
                    {tNav(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h2 className="font-heading text-light text-sm uppercase tracking-[0.25em] mb-5">
              {t("contact")}
            </h2>
            <address className="not-italic space-y-2.5 font-body text-sm text-muted">
              <p>{tContact("locationValue")}</p>
              <p>
                <a
                  href={siteConfig.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors duration-200"
                >
                  @{siteConfig.instagram.handle}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-accent transition-colors duration-200 break-all"
                >
                  {siteConfig.email}
                </a>
              </p>
              <div className="pt-2 space-y-1">
                <p>
                  <span className="text-light">{tHours("weekdays")}:</span>{" "}
                  {siteConfig.hours.opens}–{siteConfig.hours.closes}
                </p>
                <p>
                  <span className="text-light">{tHours("weekend")}:</span>{" "}
                  {tHours("closed")}
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-accent/15">
          <p className="text-center text-muted text-xs font-body tracking-wide">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
