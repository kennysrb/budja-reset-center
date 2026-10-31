import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceCard } from "@/components/ui/ServiceCard";

describe("ServiceCard", () => {
  it("renders service name and price", () => {
    render(
      <ServiceCard
        name="Classic Haircut"
        description="Traditional haircut"
        price={30}
        duration="30 min"
      />
    );
    expect(screen.getByText("Classic Haircut")).toBeInTheDocument();
    expect(screen.getByText("$30")).toBeInTheDocument();
  });
});
