import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Navbar from "@/components/layout/Navbar";

describe("Navbar", () => {
  it("renders shop name", () => {
    render(<Navbar />);
    expect(screen.getByText(/URBAN FADE/i)).toBeInTheDocument();
  });

  it("renders Book Now link", () => {
    render(<Navbar />);
    expect(screen.getByText("Book Now")).toBeInTheDocument();
  });
});
