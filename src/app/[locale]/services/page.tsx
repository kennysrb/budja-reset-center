import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { availableDurations, formatPrice } from "@/lib/pricing";
import { BookingCTA } from "@/components/home/BookingCTA";
import { PriceEstimator } from "@/components/services/PriceEstimator";
import { CarIcon, ChatIcon, ClockIcon, HandsIcon, LeafIcon } from "@/components/ui/Icons";
import { services } from "@/data/services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return createMetadata({
    locale,
    path: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const tEstimator = await getTranslations("estimator");
  const tBooking = await getTranslations("booking");
  const locale = await getLocale();

  const benefits = [
    { icon: ChatIcon, text: t("intro.benefits.talk") },
    { icon: HandsIcon, text: t("intro.benefits.tailored") },
    { icon: ClockIcon, text: t("intro.benefits.lengths") },
    { icon: CarIcon, text: t("intro.benefits.parking") },
  ];

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      {/* Intro — approach + benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div data-reveal>
          <p className="text-accent text-xs uppercase tracking-[0.35em] mb-4">{t("intro.eyebrow")}</p>
          <h2 className="font-heading text-3xl md:text-5xl text-light uppercase leading-tight mb-6">
            {t("intro.title")}
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">{t("intro.text")}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map(({ icon: Icon, text }, i) => (
              <li
                key={text}
                data-reveal
                style={{ "--d": `${150 + i * 90}ms` } as React.CSSProperties}
                className="card card-hover flex items-center gap-4 p-4"
              >
                <span className="shrink-0 w-11 h-11 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
                  <Icon size={20} />
                </span>
                <span className="text-sm text-light/90">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="zoom" className="relative">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-espresso/20">
            <Image
              src="https://images.unsplash.com/photo-1556760544-74068565f05c?w=1000&auto=format&fit=crop&q=80"
              alt={t("intro.imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 left-4 sm:-left-6 card bg-primary/95 backdrop-blur-md p-5 pr-7 flex items-center gap-4 shadow-xl animate-float-in [--d:600ms]">
            <span className="w-12 h-12 rounded-2xl bg-accent text-primary flex items-center justify-center">
              <LeafIcon size={22} />
            </span>
            <span>
              <span className="block font-heading uppercase tracking-[0.12em] text-light">
                {t("posture.name")}
              </span>
              <span className="block text-xs text-muted mt-0.5">{t("posture.note")}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Price list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading title={t("sectionTitle")} subtitle={t("sectionSubtitle")} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              delay={(i % 3) * 120}
              image={service.image}
              name={t(`items.${service.id}.name`)}
              description={t(`items.${service.id}.description`)}
              prices={availableDurations(service).map((minutes) => ({
                label: t("minutes", { minutes }),
                price: formatPrice(service.prices[minutes]!, locale),
              }))}
            />
          ))}

          {/* Posture analysis — offered, no fixed price */}
          <article
            data-reveal
            style={{ "--d": "240ms" } as React.CSSProperties}
            className="relative overflow-hidden rounded-3xl border border-dashed border-accent/35 p-8 flex flex-col gap-4 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
          >
            <span className="w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
              <LeafIcon size={26} />
            </span>
            <h3 className="font-heading text-xl md:text-2xl text-light uppercase">{t("posture.name")}</h3>
            <p className="text-muted text-sm leading-relaxed">{t("posture.description")}</p>
            <span className="mt-auto self-start rounded-full bg-accent/15 text-accent text-sm font-semibold px-4 py-1.5">
              {t("posture.note")}
            </span>
          </article>
        </div>
      </section>

      {/* How a session works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SectionHeading title={t("process.title")} subtitle={t("process.subtitle")} />
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* connecting line (desktop) */}
          <span
            aria-hidden
            className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          />
          {(["step1", "step2", "step3"] as const).map((step, i) => (
            <li
              key={step}
              data-reveal
              style={{ "--d": `${i * 150}ms` } as React.CSSProperties}
              className="relative text-center px-4"
            >
              <span className="relative z-10 mx-auto mb-6 w-20 h-20 rounded-full bg-primary border border-accent/30 text-accent font-heading text-2xl flex items-center justify-center shadow-lg shadow-accent/10">
                0{i + 1}
              </span>
              <p className="text-light/85 leading-relaxed max-w-xs mx-auto">{tBooking(`steps.${step}`)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Price calculator */}
      <section className="relative overflow-hidden bg-secondary/60 border-y border-accent/10 py-20 md:py-28">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-accent/20 blur-3xl animate-breathe"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 -left-24 w-[24rem] h-[24rem] rounded-full bg-accent-light/20 blur-3xl animate-breathe [animation-delay:3s]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={tEstimator("title")} subtitle={tEstimator("subtitle")} />
          <div data-reveal="zoom">
            <PriceEstimator />
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
