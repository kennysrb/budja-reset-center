import { getTranslations } from "next-intl/server";

export const FAQ_IDS = ["booking", "before", "prepare", "health", "duration", "parking"] as const;

export async function FaqList({ ids = FAQ_IDS }: { ids?: readonly string[] }) {
  const t = await getTranslations("faq");

  return (
    <div className="space-y-4">
      {ids.map((id, i) => (
        <details
          key={id}
          data-reveal
          style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
          className="group card px-6 md:px-8 open:shadow-lg open:shadow-espresso/10 open:border-accent/25"
          open={i === 0}
        >
          <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden">
            <h2 className="font-heading text-lg md:text-xl uppercase tracking-[0.08em] text-light">
              {t(`items.${id}.q`)}
            </h2>
            <span
              aria-hidden
              className="shrink-0 w-9 h-9 rounded-full border border-accent/30 text-accent text-lg flex items-center justify-center transition-all duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-primary"
            >
              +
            </span>
          </summary>
          <div className="pb-7 pr-4 md:pr-12 space-y-3 text-muted leading-relaxed animate-fadeIn">
            {(t.raw(`items.${id}.a`) as string[]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
