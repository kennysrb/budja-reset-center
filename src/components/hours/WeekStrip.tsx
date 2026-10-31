"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/siteConfig";
import { zonedNow } from "@/lib/hours";
import { useNow } from "@/lib/useNow";
import { cn } from "@/lib/cn";

const DAYS = [1, 2, 3, 4, 5, 6, 7];

export function WeekStrip({ className }: { className?: string }) {
  const t = useTranslations("hours");
  const now = useNow();
  const today = now ? zonedNow(now, siteConfig.hours.timeZone).weekday : null;
  const { opens, closes, days } = siteConfig.hours;

  return (
    <ol className={cn("grid grid-cols-7 gap-1.5 sm:gap-2", className)} aria-label={t("title")}>
      {DAYS.map((day) => {
        const open = days.includes(day);
        const isToday = day === today;
        return (
          <li
            key={day}
            aria-current={isToday ? "date" : undefined}
            className={cn(
              "flex flex-col items-center justify-center rounded-2xl border py-4 px-1 text-center transition-all duration-300",
              isToday
                ? "border-accent bg-accent text-primary shadow-lg shadow-accent/25 -translate-y-1"
                : open
                  ? "border-accent/15 bg-primary text-light hover:-translate-y-0.5 hover:border-accent/40"
                  : "border-dashed border-accent/20 bg-transparent text-muted",
            )}
          >
            <span className="font-heading text-xs sm:text-sm uppercase tracking-[0.15em]">
              {t(`short.${day}`)}
            </span>
            {open ? (
              <span className="mt-1.5 text-[0.65rem] sm:text-xs leading-tight tabular-nums">
                {opens}
                <span className="block sm:inline">
                  <span className="hidden sm:inline">–</span>
                  {closes}
                </span>
              </span>
            ) : (
              <span className="mt-1.5 text-[0.65rem] sm:text-xs">{t("closedShort")}</span>
            )}
            {isToday && <span className="sr-only">{t("today")}</span>}
          </li>
        );
      })}
    </ol>
  );
}
