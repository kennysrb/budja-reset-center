import { screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { OpeningStatus } from "@/components/hours/OpeningStatus";
import { WeekStrip } from "@/components/hours/WeekStrip";
import { renderWithIntl, ljubljana } from "../utils";

afterEach(() => vi.useRealTimers());

function at(iso: string) {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(ljubljana(iso));
}

describe("OpeningStatus pill", () => {
  it.each([
    ["open", "2026-11-04T17:00", "sl", "Odprto · do 20:00"],
    ["before 08:00", "2026-11-03T07:00", "sl", "Zaprto · odpremo danes ob 16:30"],
    ["after close Mon–Thu", "2026-11-05T21:00", "sl", "Zaprto · odpremo jutri ob 16:30"],
    ["Friday evening", "2026-11-06T20:30", "sl", "Zaprto · odpremo v ponedeljek ob 16:30"],
    ["Saturday", "2026-11-07T12:00", "sl", "Zaprto · odpremo v ponedeljek ob 16:30"],
    ["Sunday", "2026-11-08T12:00", "en", "Closed · opens tomorrow at 16:30"],
    ["open (en)", "2026-11-04T19:59", "en", "Open now · until 20:00"],
  ] as const)("%s", (_case, iso, locale, text) => {
    at(iso);
    renderWithIntl(<OpeningStatus />, locale);
    expect(screen.getByRole("status")).toHaveTextContent(text);
  });
});

describe("WeekStrip", () => {
  it("marks today and shows hours only on weekdays", () => {
    at("2026-11-07T12:00"); // Saturday
    renderWithIntl(<WeekStrip />);
    const days = screen.getAllByRole("listitem");
    expect(days).toHaveLength(7);
    expect(days[5]).toHaveAttribute("aria-current", "date");
    expect(days.filter((d) => d.getAttribute("aria-current"))).toHaveLength(1);
    expect(days[0]).toHaveTextContent("Pon");
    expect(days[0]).toHaveTextContent("16:30");
    expect(days[5]).toHaveTextContent("Zaprto");
    expect(days[6]).toHaveTextContent("Zaprto");
  });

  it("marks a weekday as today", () => {
    at("2026-11-03T07:00"); // Tuesday before opening
    renderWithIntl(<WeekStrip />);
    expect(screen.getAllByRole("listitem")[1]).toHaveAttribute("aria-current", "date");
  });
});
