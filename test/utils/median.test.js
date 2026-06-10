import { calculateMedian } from "../../src/utils/median.js";

describe("calculateMedian", () => {
  test("returns median for odd length array", () => {
    expect(calculateMedian([1, 2, 3, 4, 5])).toBe(3);
  });

  test("returns median for even length array", () => {
    expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
  });

  test("returns 0 for empty array", () => {
    expect(calculateMedian([])).toBe(0);
  });
});
