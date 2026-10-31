import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children text", () => {
    render(<Button>Book Now</Button>);
    expect(screen.getByText("Book Now")).toBeInTheDocument();
  });

  it("renders as link when href provided", () => {
    render(<Button href="/booking">Book Now</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/booking");
  });
});
