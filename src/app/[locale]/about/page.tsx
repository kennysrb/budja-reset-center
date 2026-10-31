import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingCTA } from "@/components/home/BookingCTA";
import { team } from "@/data/team";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return createMetadata({
    locale,
    path: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tCommon = await getTranslations("common");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section 1: My approach */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div data-reveal="zoom" className="group overflow-hidden rounded-[2.5rem] shadow-2xl shadow-espresso/15">
            <Image
              src="https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&auto=format&fit=crop&q=80"
              alt={t("storyImageAlt")}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full object-cover aspect-[4/3] transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </div>
          <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
            <h2 className="text-3xl md:text-4xl font-heading uppercase gold-gradient mb-6">
              {t("storyTitle")}
            </h2>
            <div className="space-y-4">
              <p className="text-muted leading-relaxed">{t("paragraph1")}</p>
              <p className="text-muted leading-relaxed">{t("paragraph2")}</p>
              <p className="text-muted leading-relaxed">{t("paragraph3")}</p>
            </div>
          </div>
        </section>

        {/* Section 2: Therapist */}
        <section>
          <SectionHeading title={t("teamTitle")} />
          <div className="space-y-8">
            {team.map((member) => (
              <article
                key={member.id}
                data-reveal="zoom"
                className="card group overflow-hidden grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto"
              >
                <div className="relative aspect-[889/820] md:aspect-auto md:min-h-[28rem] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={t(`team.${member.id}.imageAlt`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 512px"
                    className="object-cover object-[70%_40%] transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-accent text-xs uppercase tracking-[0.35em] mb-3">
                    {t(`team.${member.id}.role`)}
                  </p>
                  <h3 className="font-heading text-3xl md:text-4xl uppercase tracking-[0.1em] text-light mb-5">
                    {t(`team.${member.id}.name`)}
                  </h3>
                  <p className="text-muted leading-relaxed mb-8">
                    {t(`team.${member.id}.bio`)}
                  </p>
                  <Link href="/booking" className="btn-gold self-start">
                    {tCommon("bookAppointment")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <BookingCTA />
    </>
  );
}
