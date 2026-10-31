import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="bg-secondary text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Shop name + tagline */}
          <div>
            <h2 className="font-heading text-accent text-2xl font-bold tracking-widest uppercase mb-3">
              {siteConfig.name}
            </h2>
            <p className="text-muted font-body">{siteConfig.tagline}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-light text-lg font-semibold mb-4 tracking-wide">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
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
            <h3 className="font-heading text-light text-lg font-semibold mb-4 tracking-wide">
              {t("contact")}
            </h3>
            <address className="not-italic space-y-2 font-body text-sm text-muted">
              <p>{siteConfig.address}</p>
              <p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-accent transition-colors duration-200"
                >
                  {siteConfig.email}
                </a>
              </p>
              <div className="pt-2 space-y-1">
                {siteConfig.hours.map((h) => (
                  <p key={h.day}>
                    <span className="text-light">{h.day}:</span> {h.hours}
                  </p>
                ))}
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-muted/20">
          <p className="text-center text-muted text-sm font-body">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
