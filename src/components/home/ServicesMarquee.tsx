import { getTranslations } from "next-intl/server";
import { services } from "@/data/services";

// Slow, infinite ribbon of offered treatments under the hero. The list is rendered twice
// so the -50% loop is seamless; the copy is hidden from assistive tech.
export async function ServicesMarquee() {
  const t = await getTranslations("services");
  const tPosture = await getTranslations("services.posture");
  const names = [...services.map((s) => t(`items.${s.id}.name`)), tPosture("name")];

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {names.map((name) => (
        <li key={name} className="flex items-center">
          <span className="px-8 font-heading text-lg md:text-2xl uppercase tracking-[0.2em] text-light/70 whitespace-nowrap">
            {name}
          </span>
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative overflow-hidden border-y border-accent/10 bg-secondary/50 py-5 md:py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
