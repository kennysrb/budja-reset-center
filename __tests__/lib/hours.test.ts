import { describe, it, expect } from "vitest";
import { getOpeningStatus, zonedNow } from "@/lib/hours";
import { siteConfig } from "@/data/siteConfig";
import { ljubljana } from "../utils";

const status = (iso: string) => getOpeningStatus(ljubljana(iso), siteConfig.hours);

describe("opening hours: Mon–Fri 16:30–20:00 Europe/Ljubljana", () => {
  it("reads Ljubljana wall-clock time regardless of the runtime time zone", () => {
    expect(zonedNow(ljubljana("2026-11-03T07:15"), "Europe/Ljubljana")).toEqual({
      weekday: 2,
      minutes: 7 * 60 + 15,
    });
  });

  it("open on a weekday afternoon", () => {
    expect(status("2026-11-04T17:00")).toEqual({ isOpen: true, today: 3, closes: "20:00" });
  });

  it("open at exactly 16:30 and closed at exactly 20:00", () => {
    expect(status("2026-11-04T16:30").isOpen).toBe(true);
    expect(status("2026-11-04T20:00")).toMatchObject({ isOpen: false, nextOpenInDays: 1, nextOpenWeekday: 4 });
  });

  it("before 08:00 on a weekday → opens later today", () => {
    expect(status("2026-11-03T07:00")).toMatchObject({
      isOpen: false,
      today: 2,
      nextOpenInDays: 0,
      opens: "16:30",
    });
  });

  it("weekday morning/midday → opens later today", () => {
    expect(status("2026-11-03T12:00")).toMatchObject({ isOpen: false, nextOpenInDays: 0 });
  });

  it("after closing Mon–Thu → opens tomorrow", () => {
    expect(status("2026-11-05T21:00")).toMatchObject({ isOpen: false, nextOpenInDays: 1, nextOpenWeekday: 5 });
  });

  it("Friday evening → opens Monday", () => {
    expect(status("2026-11-06T20:30")).toMatchObject({ isOpen: false, nextOpenInDays: 3, nextOpenWeekday: 1 });
  });

  it("weekend → closed; Saturday opens in 2 days, Sunday tomorrow", () => {
    expect(status("2026-11-07T17:00")).toMatchObject({ isOpen: false, today: 6, nextOpenInDays: 2, nextOpenWeekday: 1 });
    expect(status("2026-11-08T17:00")).toMatchObject({ isOpen: false, today: 7, nextOpenInDays: 1, nextOpenWeekday: 1 });
  });

  it("handles summer time (CEST) the same way", () => {
    expect(status("2026-07-15T17:00").isOpen).toBe(true);
    expect(status("2026-07-15T16:00").isOpen).toBe(false);
  });
});
