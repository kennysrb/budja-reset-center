import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "../utils";

vi.mock("@/i18n/navigation", async () => (await import("../navigationMock")).navigationMock);
const { default: Navbar } = await import("@/components/layout/Navbar");

describe("Navbar", () => {
  it("renders the wordmark and nav links", () => {
    renderWithIntl(<Navbar />);
    expect(screen.getByRole("link", { name: "Budja Reset Center" })).toHaveAttribute("href", "/");
    for (const name of ["Domov", "Masaže", "O meni", "FAQ", "Galerija", "Kontakt"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }
  });

  it("renders the booking link and theme toggle", () => {
    renderWithIntl(<Navbar />, "en");
    expect(screen.getByRole("link", { name: "Book a session" })).toHaveAttribute("href", "/booking");
    expect(screen.getByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });
});
