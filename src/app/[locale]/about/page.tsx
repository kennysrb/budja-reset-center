import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingCTA } from "@/components/home/BookingCTA";
import { team } from "@/data/team";

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
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                data-reveal
                className="card card-hover p-10 text-center flex flex-col w-full max-w-sm"
              >
                <Image
                  src={member.image}
                  alt={t(`team.${member.id}.name`)}
                  width={200}
                  height={200}
                  sizes="160px"
                  className="rounded-full object-cover w-40 h-40 mx-auto mb-6 ring-4 ring-accent/20 ring-offset-4 ring-offset-secondary"
                />
                <h3 className="text-xl font-heading uppercase tracking-[0.15em] text-light mb-1">
                  {t(`team.${member.id}.name`)}
                </h3>
                <p className="text-accent text-sm mb-3">
                  {t(`team.${member.id}.role`)}
                </p>
                <p className="text-muted text-sm">
                  {t(`team.${member.id}.bio`)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BookingCTA />
    </>
  );
}
