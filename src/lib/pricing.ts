import { services } from "@/data/services";
import { Duration, Service } from "@/types";

export const DURATIONS: Duration[] = [30, 60, 90];

export function formatPrice(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Durations offered for a service, shortest first. */
export function availableDurations(service: Service): Duration[] {
  return DURATIONS.filter((d) => service.prices[d] !== undefined);
}

export function findService(id: string | undefined) {
  return services.find((s) => s.id === id);
}

/** Price for a service/duration pair, or null if that combination isn't offered. */
export function getPrice(serviceId: string, duration: number): number | null {
  const service = findService(serviceId);
  return service?.prices[duration as Duration] ?? null;
}

/** Validates untrusted input (e.g. query params) into an offered selection. */
export function parseSelection(serviceId?: string, duration?: string) {
  const service = findService(serviceId);
  const minutes = Number(duration) as Duration;
  if (!service || !DURATIONS.includes(minutes)) return null;
  const price = service.prices[minutes];
  if (price === undefined) return null;
  return { service, duration: minutes, price };
}
