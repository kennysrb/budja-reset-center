import { siteConfig } from "@/data/siteConfig";
import { Duration } from "@/types";

/** Only real Calendly HTTPS links are embedded; anything else counts as "not configured". */
export function isCalendlyUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && (u.hostname === "calendly.com" || u.hostname.endsWith(".calendly.com"));
  } catch {
    return false;
  }
}

/** Per-length event if configured, else the general booking link. Empty string = not configured. */
export function resolveCalendlyUrl(duration?: Duration) {
  const { url, eventUrls } = siteConfig.calendly;
  const specific = duration ? eventUrls[duration] : undefined;
  if (isCalendlyUrl(specific)) return specific;
  return isCalendlyUrl(url) ? url : "";
}

/**
 * Inline-embed src. `prefill` lands in the event's first custom question (Calendly `a1`),
 * so the therapist sees the chosen massage and length on the booking.
 */
export function buildCalendlyEmbedSrc(url: string, prefill?: string) {
  const u = new URL(url);
  u.searchParams.set("embed_type", "Inline");
  u.searchParams.set("hide_gdpr_banner", "1");
  u.searchParams.set("hide_landing_page_details", "1");
  u.searchParams.set("hide_event_type_details", "1");
  u.searchParams.set("primary_color", "7a5e48");
  if (prefill) u.searchParams.set("a1", prefill);
  return u.toString();
}
