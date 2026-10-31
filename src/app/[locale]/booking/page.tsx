import { getLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";
import { siteConfig } from "@/data/siteConfig";
import { formatPrice, parseSelection } from "@/lib/pricing";
import { resolveCalendlyUrl } from "@/lib/booking";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });
  return createMetadata({
    locale,
    path: "/booking",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; duration?: string }>;
}) {
  const t = await getTranslations("booking");
  const tServices = await getTranslations("services");
  const locale = await getLocale();
  const { service, duration } = await searchParams;

  // Query params are untrusted: only an offered service/length pair is accepted.
  const selection = parseSelection(service, duration);
  const selectionLabel = selection
    ? `${tServices(`items.${selection.service.id}.name`)} · ${tServices("minutes", { minutes: selection.duration })}`
    : undefined;
  const calendlyUrl = resolveCalendlyUrl(selection?.duration);

  return (
    <>
      <PageHero title={t("pageTitle")} subtitle={t("pageSubtitle")} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {selection && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card px-6 py-5">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">{t("selected")}</p>
              <p className="text-light">
                {selectionLabel} ·{" "}
                <span className="text-accent font-semibold">
                  {formatPrice(selection.price, locale)}
                </span>
              </p>
            </div>
            <Link href="/services" className="text-sm text-accent hover:underline underline-offset-4">
              {t("change")}
            </Link>
          </div>
        )}

        <CalendlyEmbed url={calendlyUrl} prefill={selectionLabel} />

        {/* How to book — from the client's Instagram "Kako se naročiš?" story */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {(["step1", "step2", "step3"] as const).map((step, i) => (
            <div
              key={step}
              data-reveal
              style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
              className="card card-hover p-6"
            >
              <p className="font-heading text-accent text-2xl mb-2">0{i + 1}</p>
              <p className="text-light/80">{t(`steps.${step}`)}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-muted text-sm">
          {t("preferDm")}{" "}
          <a
            href={siteConfig.instagram.dmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-4"
          >
            @{siteConfig.instagram.handle}
          </a>
        </p>
      </div>
    </>
  );
}
