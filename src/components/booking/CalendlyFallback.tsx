import { useTranslations } from "next-intl";

interface CalendlyFallbackProps {
  url: string;
  t: ReturnType<typeof useTranslations>;
}

export function CalendlyFallback({ url, t }: CalendlyFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="bg-secondary border border-muted/20 rounded-2xl p-12 text-center flex flex-col items-center gap-6 max-w-md w-full">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
        <div>
          <h3 className="font-heading text-2xl text-light uppercase tracking-wide mb-3">
            {t("fallback.heading")}
          </h3>
          <p className="text-muted font-body text-sm leading-relaxed">
            {t("fallback.text")}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold w-full text-center py-3"
        >
          {t("fallback.button")}
        </a>
        <p className="text-muted/50 font-body text-xs">{t("fallback.footer")}</p>
      </div>
    </div>
  );
}
