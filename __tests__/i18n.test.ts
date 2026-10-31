import { describe, it, expect } from "vitest";
import { messages } from "./utils";

function keys(obj: unknown, prefix = ""): string[] {
  if (Array.isArray(obj)) return [`${prefix}[${obj.length}]`];
  if (obj && typeof obj === "object") {
    return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
  }
  return [prefix];
}

describe("translations", () => {
  it("sl and en have identical keys (and equal-length paragraph arrays)", () => {
    expect(keys(messages.en).sort()).toEqual(keys(messages.sl).sort());
  });

  it("contain no leftover template content", () => {
    const text = JSON.stringify(messages);
    expect(text).not.toMatch(/barber|gentleman|haircut|fade|beard|brivnic/i);
  });
});
