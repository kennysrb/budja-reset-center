"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CalendlyLoader } from "@/components/booking/CalendlyLoader";
import { CalendlyFallback } from "@/components/booking/CalendlyFallback";

const DEMO_URL = "https://calendly.com/urban-fade-demo";

export function CalendlyEmbed({ url }: { url: string }) {
  const t = useTranslations("booking");
  const isPlaceholder = url === DEMO_URL || !url;

  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [failed, setFailed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadedRef = useRef(false);

  const dismissLoader = () => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    if (fallbackRef.current !== null) clearTimeout(fallbackRef.current);
    setProgress(100);
    setTimeout(() => setFading(true), 200);
    setTimeout(() => setHidden(true), 700);
  };

  useEffect(() => {
    if (isPlaceholder) return;

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += current < 40 ? 4 : current < 70 ? 1.5 : 0.4;
      if (current >= 85) {
        current = 85;
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
      }
      setProgress(current);
    }, 80);

    // Fallback: show error card after 25s only if iframe never loaded
    fallbackRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
        setFailed(true);
        setHidden(true);
      }
    }, 25000);

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      if (fallbackRef.current !== null) clearTimeout(fallbackRef.current);
    };
  }, [isPlaceholder]);

  if (isPlaceholder) {
    return (
      <div className="bg-secondary border border-muted/20 rounded-lg p-12 text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
          <svg
            width="36"
            height="36"
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
            {t("placeholder.heading")}
          </h3>
          <p className="text-muted font-body max-w-md mx-auto">
            {t("placeholder.text")}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            {t("placeholder.setupButton")}
          </a>
          <Link href="/contact" className="btn-outline-gold">
            {t("placeholder.contactButton")}
          </Link>
        </div>
      </div>
    );
  }

  if (failed) {
    return <CalendlyFallback url={url} t={t} />;
  }

  return (
    <div className="relative w-full max-w-[850px] mx-auto">
      {/* Loader is outside the clipped iframe container */}
      {!hidden && (
        <div
          className="absolute inset-0 z-10 transition-opacity duration-500 bg-black/50"
          style={{ opacity: fading ? 0 : 1 }}
        >
          <CalendlyLoader progress={progress} text={t("loaderText")} />
        </div>
      )}

      {/* Clipping Container - Centered via mx-auto */}
      <div className="relative w-full h-[640px] max-w-[650px] overflow-hidden bg-white rounded-lg shadow-sm mx-auto">
        <iframe
          src={`${url}?embed_type=Inline&hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1`}
          className="absolute -top-[55px] left-0 w-full h-[750px] border-none"
          onLoad={() => setTimeout(dismissLoader, 3000)}
          title={t("iframeTitle")}
          scrolling="no"
        />
      </div>
    </div>
  );
}
