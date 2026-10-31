import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookingCTA } from "@/components/home/BookingCTA";
import { team } from "@/data/team";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section 1: Our Story */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <Image
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80"
              alt={t("storyImageAlt")}
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-lg w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-heading gold-gradient mb-6">
              {t("storyTitle")}
            </h2>
            <div className="space-y-4">
              <p className="text-muted">{t("paragraph1")}</p>
              <p className="text-muted">{t("paragraph2")}</p>
              <p className="text-muted">{t("paragraph3")}</p>
            </div>
          </div>
        </section>

        {/* Section 2: Meet The Team */}
        <section>
          <SectionHeading title={t("teamTitle")} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="bg-secondary rounded-lg p-6 text-center flex flex-col justify-between"
              >
                <Image
                  src={member.image}
                  alt={t(`team.${member.id}.name`)}
                  width={200}
                  height={200}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-heading text-light mb-1">
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
      </main>

      <BookingCTA />
    </>
  );
}
