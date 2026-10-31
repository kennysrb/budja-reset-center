import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders shop name", () => {
    render(<Footer />);
    expect(screen.getByText(/Urban Fade/i)).toBeInTheDocument();
  });
});
