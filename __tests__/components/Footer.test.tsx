import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { createTranslator } from "next-intl";
import { messages } from "../utils";

vi.mock("@/i18n/navigation", async () => (await import("../navigationMock")).navigationMock);
// Footer is an async server component; resolve its translations from the real sl messages.
vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: string) =>
    createTranslator({ locale: "sl", messages: messages.sl, namespace: namespace as never }),
}));
const { default: Footer } = await import("@/components/layout/Footer");

describe("Footer", () => {
  it("renders contact details without phone or street address", async () => {
    render(await Footer());
    expect(screen.getByText("Škofljica, Slovenija")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "info.resetcenter@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:info.resetcenter@gmail.com",
    );
    expect(screen.getByText(/16:30–20:00/)).toBeInTheDocument();
    expect(document.querySelector('a[href^="tel:"]')).toBeNull();
  });
});
