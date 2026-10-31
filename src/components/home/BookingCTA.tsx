import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/siteConfig";
import { ArrowRightIcon } from "@/components/ui/Icons";

export async function BookingCTA() {
  const t = await getTranslations("bookingCta");
  const tCommon = await getTranslations("common");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Always-dark photo panel, so it reads the same in both themes */}
      <div
        data-reveal="zoom"
        className="relative max-w-7xl mx-auto overflow-hidden rounded-[2.5rem] px-6 py-16 md:py-24 text-center shadow-2xl shadow-espresso/20"
      >
        <Image
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&auto=format&fit=crop&q=80"
          alt=""
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-espresso/75" />
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] rounded-full bg-sand/25 blur-3xl animate-breathe"
        />

        <div className="relative">
          <h2 className="font-heading text-3xl md:text-5xl uppercase text-cream mb-5">
            {t("title")}
          </h2>
          <p className="text-cream/75 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 bg-sand text-espresso font-semibold uppercase tracking-widest px-8 py-4 text-sm rounded-full shadow-lg shadow-espresso/30 transition-all duration-300 hover:bg-cream hover:-translate-y-0.5"
            >
              {tCommon("bookAppointment")}
              <ArrowRightIcon size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={siteConfig.instagram.dmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-cream/40 bg-cream/5 backdrop-blur-sm text-cream font-semibold uppercase tracking-widest px-8 py-4 text-sm rounded-full transition-all duration-300 hover:bg-cream hover:text-espresso hover:-translate-y-0.5"
            >
              {tCommon("writeDm")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
