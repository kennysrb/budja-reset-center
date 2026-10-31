import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export async function AboutIntro() {
  const t = await getTranslations("aboutIntro");
  const tCommon = await getTranslations("common");

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div data-reveal="zoom" className="group relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-espresso/15">
            <Image
              src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1000&auto=format&fit=crop&q=80"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </div>
          <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties}>
            <h2 className="font-heading text-3xl md:text-4xl uppercase gold-gradient mb-6">
              {t("title")}
            </h2>
            <p className="text-light/80 text-base leading-relaxed mb-4">
              {t("paragraph1")}
            </p>
            <p className="text-light/80 text-base leading-relaxed mb-8">
              {t("paragraph2")}
            </p>
            <Button variant="outline" size="md" href="/about">
              {tCommon("learnMore")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
