"use client";

import { useTranslations } from "next-intl";
import { siteConfig } from "@/data/siteConfig";
import { getOpeningStatus } from "@/lib/hours";
import { useNow } from "@/lib/useNow";
import { cn } from "@/lib/cn";

interface OpeningStatusProps {
  /** "image" = cream text for use over photos */
  tone?: "default" | "image";
  className?: string;
}

export function OpeningStatus({ tone = "default", className }: OpeningStatusProps) {
  const t = useTranslations("hours");
  const now = useNow();

  const base = cn(
    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs tracking-wide font-body",
    tone === "image"
      ? "border-cream/30 bg-espresso/40 text-cream backdrop-blur-sm"
      : "border-accent/20 bg-secondary text-light",
    className,
  );

  // Server render / first paint: neutral placeholder of the same shape.
  if (!now) {
    return (
      <span className={base} aria-hidden>
        <span className="w-2 h-2 rounded-full bg-current opacity-30" />
        {t("title")}
      </span>
    );
  }

  const status = getOpeningStatus(now, siteConfig.hours);
  let label: string;
  if (status.isOpen) {
    label = t("openNow", { time: status.closes });
  } else if (status.nextOpenInDays === 0) {
    label = t("opensToday", { time: status.opens });
  } else if (status.nextOpenInDays === 1) {
    label = t("opensTomorrow", { time: status.opens });
  } else {
    label = t("opensOn", {
      day: t(`on.${status.nextOpenWeekday}`),
      time: status.opens,
    });
  }

  return (
    <span className={base} role="status" data-open={status.isOpen}>
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-400",
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}
