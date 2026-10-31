import { describe, it, expect } from "vitest";
import { availableDurations, formatPrice, getPrice, parseSelection } from "@/lib/pricing";
import { services } from "@/data/services";

// The approved (placeholder) price list. If data changes, this table must change with it.
const PRICE_TABLE: Record<string, Record<number, number | null>> = {
  classic: { 30: 25, 60: 45, 90: 65 },
  sports: { 30: 30, 60: 50, 90: 70 },
  therapeutic: { 30: 30, 60: 50, 90: 70 },
  cupping: { 30: 25, 60: 45, 90: null },
  triggerPoint: { 30: 30, 60: 50, 90: null },
};

describe("pricing", () => {
  it("covers exactly the approved services", () => {
    expect(services.map((s) => s.id)).toEqual(Object.keys(PRICE_TABLE));
  });

  it.each(Object.entries(PRICE_TABLE).flatMap(([id, row]) => Object.entries(row).map(([d, p]) => [id, Number(d), p] as const)))(
    "%s %i min → %s €",
    (id, minutes, expected) => {
      expect(getPrice(id, minutes)).toBe(expected);
    },
  );

  it("lists only offered durations", () => {
    expect(availableDurations(services.find((s) => s.id === "cupping")!)).toEqual([30, 60]);
    expect(availableDurations(services.find((s) => s.id === "classic")!)).toEqual([30, 60, 90]);
  });

  it("formats EUR per locale", () => {
    expect(formatPrice(45, "sl").replace(/\s/g, " ")).toBe("45 €");
    expect(formatPrice(45, "en")).toBe("€45");
  });

  it("parseSelection accepts only offered pairs (query params are untrusted)", () => {
    expect(parseSelection("sports", "90")).toMatchObject({ duration: 90, price: 70 });
    expect(parseSelection("cupping", "90")).toBeNull();
    expect(parseSelection("classic", "45")).toBeNull();
    expect(parseSelection("classic", "60abc")).toBeNull();
    expect(parseSelection("<script>", "60")).toBeNull();
    expect(parseSelection(undefined, undefined)).toBeNull();
  });
});
