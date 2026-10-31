import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ServiceCard } from "@/components/ui/ServiceCard";

describe("ServiceCard", () => {
  it("renders name, description and one row per length", () => {
    render(
      <ServiceCard
        name="Klasična masaža"
        description="Sproščujoča masaža"
        prices={[
          { label: "30 min", price: "25 €" },
          { label: "60 min", price: "45 €" },
        ]}
      />,
    );
    expect(screen.getByRole("heading", { name: "Klasična masaža" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getByText("45 €")).toBeInTheDocument();
  });
});
