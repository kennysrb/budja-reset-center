"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/services";
import { availableDurations, DURATIONS, formatPrice, getPrice } from "@/lib/pricing";
import { cn } from "@/lib/cn";
import { Duration } from "@/types";

export function PriceEstimator() {
  const t = useTranslations("estimator");
  const tServices = useTranslations("services");
  const locale = useLocale();
  const [serviceId, setServiceId] = useState(services[0].id);
  const [duration, setDuration] = useState<Duration>(60);

  const service = services.find((s) => s.id === serviceId)!;
  const offered = availableDurations(service);
  // Keep the chosen length if offered, otherwise fall back to the longest offered one.
  const activeDuration = offered.includes(duration) ? duration : offered[offered.length - 1];
  const total = getPrice(serviceId, activeDuration)!;

  const pill = (active: boolean) =>
    cn(
      "px-5 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0",
      active
        ? "bg-accent border-accent text-primary shadow-md shadow-accent/25"
        : "border-accent/25 bg-primary/50 text-light hover:border-accent hover:-translate-y-0.5",
    );

  return (
    <div className="card bg-primary/80 backdrop-blur-sm p-6 md:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2 space-y-8">
        <fieldset>
          <legend className="text-xs text-muted uppercase tracking-widest mb-3">
            {t("chooseMassage")}
          </legend>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={s.id === serviceId}
                onClick={() => setServiceId(s.id)}
                className={pill(s.id === serviceId)}
              >
                {tServices(`items.${s.id}.name`)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs text-muted uppercase tracking-widest mb-3">
            {t("chooseDuration")}
          </legend>
          <div className="flex flex-wrap gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={d === activeDuration}
                disabled={!offered.includes(d)}
                onClick={() => setDuration(d)}
                className={pill(d === activeDuration)}
              >
                {tServices("minutes", { minutes: d })}
              </button>
            ))}
          </div>
          {offered.length < DURATIONS.length && (
            <p className="text-muted text-xs mt-3">{t("notOffered")}</p>
          )}
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-6 lg:border-l lg:border-accent/15 lg:pl-12">
        <div>
          <p className="text-xs text-muted uppercase tracking-widest mb-2">{t("total")}</p>
          <p
            key={total}
            className="font-heading text-6xl text-accent tabular-nums animate-pop origin-left"
            aria-live="polite"
            data-testid="estimator-total"
          >
            {formatPrice(total, locale)}
          </p>
          <p className="text-muted text-sm mt-2">
            {tServices(`items.${serviceId}.name`)} · {tServices("minutes", { minutes: activeDuration })}
          </p>
        </div>
        <Link
          href={{ pathname: "/booking", query: { service: serviceId, duration: activeDuration } }}
          className="btn-gold text-center"
        >
          {t("bookThis")}
        </Link>
      </div>
    </div>
  );
}
