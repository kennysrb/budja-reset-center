import { getTranslations } from "next-intl/server";
import { OpeningStatus } from "@/components/hours/OpeningStatus";
import { WeekStrip } from "@/components/hours/WeekStrip";
import { CarIcon, MapPinIcon, MessageIcon } from "@/components/ui/Icons";

export async function InfoStrip() {
  const t = await getTranslations("info");

  const facts = [
    { icon: MapPinIcon, text: t("location") },
    { icon: CarIcon, text: t("parking") },
    { icon: MessageIcon, text: t("booking") },
  ];

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-2">
            <p className="text-accent text-xs uppercase tracking-[0.35em] mb-3 font-body">
              {t("eyebrow")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-light uppercase mb-5">
              {t("title")}
            </h2>
            <OpeningStatus className="mb-7" />
            <ul className="space-y-3">
              {facts.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm text-muted">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Icon size={17} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <WeekStrip className="lg:col-span-3" />
        </div>
      </div>
    </section>
  );
}
