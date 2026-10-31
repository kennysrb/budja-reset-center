import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CalendlyEmbed } from "@/components/booking/CalendlyEmbed";

describe("CalendlyEmbed", () => {
  it("renders calendly widget container with correct URL", () => {
    render(<CalendlyEmbed url="https://calendly.com/test" />);
    const widget = document.querySelector(".calendly-inline-widget");
    expect(widget).toBeInTheDocument();
    expect(widget).toHaveAttribute("data-url", "https://calendly.com/test");
  });
});
