import { describe, it, expect } from "vitest";
import { buildCalendlyEmbedSrc, isCalendlyUrl } from "@/lib/booking";

describe("booking helpers", () => {
  it("only accepts https Calendly links", () => {
    expect(isCalendlyUrl("https://calendly.com/budja/60min")).toBe(true);
    expect(isCalendlyUrl("http://calendly.com/budja")).toBe(false);
    expect(isCalendlyUrl("https://evil.com/calendly.com")).toBe(false);
    expect(isCalendlyUrl("https://calendly.com.evil.com/x")).toBe(false);
    expect(isCalendlyUrl("javascript:alert(1)")).toBe(false);
    expect(isCalendlyUrl("")).toBe(false);
  });

  it("builds the inline embed URL with the prefilled selection", () => {
    const src = new URL(buildCalendlyEmbedSrc("https://calendly.com/budja/60min", "Športna masaža · 60 min"));
    expect(src.origin + src.pathname).toBe("https://calendly.com/budja/60min");
    expect(src.searchParams.get("embed_type")).toBe("Inline");
    expect(src.searchParams.get("hide_gdpr_banner")).toBe("1");
    expect(src.searchParams.get("a1")).toBe("Športna masaža · 60 min");
  });

  it("omits a1 when nothing is selected", () => {
    expect(new URL(buildCalendlyEmbedSrc("https://calendly.com/budja")).searchParams.has("a1")).toBe(false);
  });
});
