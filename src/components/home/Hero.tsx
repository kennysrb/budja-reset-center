import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function Hero() {
  const t = await getTranslations("hero");
  const tCommon = await getTranslations("common");

  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-24 md:pt-28">
      <Image
        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&auto=format&fit=crop&q=80"
        alt={t("imageAlt")}
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 section-container w-full pb-20">
        <div className="max-w-2xl pl-6">
          <p className="text-accent text-xs uppercase tracking-[0.4em] mb-4 font-body">
            {t("location")}
          </p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-light uppercase leading-none mb-6">
            {t("headline1")}
            <br />
            <span className="text-accent">{t("headline2")}</span> {t("headline3")}
          </h1>
          <p className="text-light/70 text-base md:text-lg mb-10 max-w-lg font-body">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking" className="btn-gold">
              {tCommon("bookAppointment")}
            </Link>
            <Link href="/services" className="btn-outline-gold">
              {t("viewServices")}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-muted text-xs uppercase tracking-widest font-body">
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
          className="text-accent"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
