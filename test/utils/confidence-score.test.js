import {
  calculateConfidenceScore,
} from "../../src/utils/confidence-score.js";

describe("calculateConfidenceScore", () => {

  test("returns APPROVED for valid submission", () => {

    const result =
      calculateConfidenceScore({

        companyExists: true,
        roleExists: true,
        levelExists: true,
        locationExists: true,
        salaryInRange: true,
        isDuplicate: false,
      });

    expect(result.score)
      .toBe(100);

    expect(result.status)
      .toBe("APPROVED");

  });

  test("returns FLAGGED for low confidence", () => {

    const result =
      calculateConfidenceScore({

        companyExists: false,
        roleExists: false,
        levelExists: false,
        locationExists: false,
        salaryInRange: false,
        isDuplicate: true,
      });

    expect(result.status)
      .toBe("FLAGGED");

  });

});