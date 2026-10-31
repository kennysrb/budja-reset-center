import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { renderWithIntl } from "../utils";

vi.mock("@/i18n/navigation", async () => (await import("../navigationMock")).navigationMock);
const { PriceEstimator } = await import("@/components/services/PriceEstimator");

const total = () => screen.getByTestId("estimator-total").textContent!.replace(/\s/g, " ");
const click = (name: string) => fireEvent.click(screen.getByRole("button", { name }));

describe("PriceEstimator", () => {
  it("defaults to classic 60 min = 45 €", () => {
    renderWithIntl(<PriceEstimator />);
    expect(total()).toBe("45 €");
  });

  it.each([
    ["Klasična masaža", "30 min", "25 €"],
    ["Klasična masaža", "90 min", "65 €"],
    ["Športna masaža", "30 min", "30 €"],
    ["Športna masaža", "90 min", "70 €"],
    ["Terapevtska masaža", "60 min", "50 €"],
    ["Masaža z ventuzami", "30 min", "25 €"],
    ["Trigger point terapija", "60 min", "50 €"],
  ])("%s · %s = %s", (massage, length, expected) => {
    renderWithIntl(<PriceEstimator />);
    click(massage);
    click(length);
    expect(total()).toBe(expected);
  });

  it("disables 90 min for cupping and falls back to the longest offered length", () => {
    renderWithIntl(<PriceEstimator />);
    click("90 min");
    click("Masaža z ventuzami");
    expect(screen.getByRole("button", { name: "90 min" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "60 min" })).toHaveAttribute("aria-pressed", "true");
    expect(total()).toBe("45 €");
  });

  it("links to booking with the selection", () => {
    renderWithIntl(<PriceEstimator />);
    click("Športna masaža");
    click("90 min");
    expect(screen.getByRole("link", { name: "Rezerviraj ta termin" })).toHaveAttribute(
      "href",
      "/booking?service=sports&duration=90",
    );
  });
});
