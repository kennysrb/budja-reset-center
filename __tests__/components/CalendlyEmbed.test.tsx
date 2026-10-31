import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "../utils";

vi.mock("@/i18n/navigation", async () => (await import("../navigationMock")).navigationMock);
const { CalendlyEmbed } = await import("@/components/booking/CalendlyEmbed");

describe("CalendlyEmbed", () => {
  it("shows the 'coming soon' state with an Instagram DM fallback when no URL is configured", () => {
    renderWithIntl(<CalendlyEmbed url="" />);
    expect(screen.getByRole("heading", { name: "Spletna rezervacija prihaja kmalu" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Piši mi na Instagramu" })).toHaveAttribute(
      "href",
      "https://ig.me/m/budja_reset_center",
    );
    expect(document.querySelector("iframe")).toBeNull();
  });

  it("embeds Calendly with the selection prefilled", () => {
    renderWithIntl(<CalendlyEmbed url="https://calendly.com/budja/60min" prefill="Klasična masaža · 60 min" />);
    const iframe = document.querySelector("iframe")!;
    const src = new URL(iframe.getAttribute("src")!);
    expect(src.hostname).toBe("calendly.com");
    expect(src.searchParams.get("a1")).toBe("Klasična masaža · 60 min");
    expect(iframe).toHaveAttribute("title", "Spletna rezervacija termina");
  });
});
