import { describe, expect, it } from "vitest";
import { safeEqualSecret } from "./secret-equal.js";

describe("safeEqualSecret", () => {
  it("matches identical secrets", () => {
    expect(safeEqualSecret("secret-token", "secret-token")).toBe(true);
  });

  it("rejects mismatched secrets", () => {
    expect(safeEqualSecret("secret-token", "secret-tokEn")).toBe(false);
  });

  it("rejects different-length secrets (constant-time)", () => {
    expect(safeEqualSecret("short", "much-longer")).toBe(false);
  });

  it("rejects missing values", () => {
    expect(safeEqualSecret(undefined, "secret")).toBe(false);
    expect(safeEqualSecret("secret", undefined)).toBe(false);
    expect(safeEqualSecret(null, "secret")).toBe(false);
  });

  it("rejects empty string vs non-empty", () => {
    expect(safeEqualSecret("", "secret")).toBe(false);
    expect(safeEqualSecret("secret", "")).toBe(false);
  });

  it("matches two empty strings", () => {
    expect(safeEqualSecret("", "")).toBe(true);
  });
});
