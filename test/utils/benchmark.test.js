import { jest } from "@jest/globals";

import { getBenchmarkStatus } from "../../src/utils/benchmark-status.js";

describe("getBenchmarkStatus", () => {
  test("returns UNDERPAID", () => {
    expect(getBenchmarkStatus(-15)).toBe("UNDERPAID");
  });

  test("returns FAIRLY_PAID", () => {
    expect(getBenchmarkStatus(5)).toBe("FAIRLY_PAID");
  });

  test("returns OVERPAID", () => {
    expect(getBenchmarkStatus(20)).toBe("OVERPAID");
  });
});
