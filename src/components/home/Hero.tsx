import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { OpeningStatus } from "@/components/hours/OpeningStatus";

export async function Hero() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-24 md:pt-28">
      <Image
        src="https://images.unsplash.com/photo-1598901986949-f593ff2a31a6?w=1920&auto=format&fit=crop&q=80"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-top animate-ken-burns"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/60 to-espresso/25" />

      <div className="relative z-10 section-container w-full pb-20">
        <div className="max-w-2xl sm:pl-6">
          <p className="text-sand text-xs uppercase tracking-[0.4em] mb-5 font-body animate-fade-up [--d:100ms]">
            {t("location")}
          </p>
          <OpeningStatus tone="image" className="mb-6 animate-fade-up [--d:250ms]" />
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream uppercase leading-[0.95] tracking-[0.06em] mb-6 animate-fade-up [--d:400ms]">
            {t("headline1")}
            <br />
            <span className="text-sand">{t("headline2")}</span>
          </h1>
          <p className="text-cream/80 text-base md:text-lg mb-10 max-w-lg font-body animate-fade-up [--d:600ms]">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [--d:800ms]">
            <Link href="/booking" className="btn-gold text-center">
              {tCommon("bookAppointment")}
            </Link>
            <Link
              href="/services"
              className="inline-block text-center border border-cream/60 bg-cream/5 backdrop-blur-sm text-cream font-semibold px-7 py-3 rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cream hover:text-espresso hover:-translate-y-0.5"
            >
              {t("viewServices")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-cream/70 text-xs uppercase tracking-widest font-body">
          {tCommon("scroll")}
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-sand"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
