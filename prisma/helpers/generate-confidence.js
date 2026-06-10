import { calculateConfidenceScore }
from "../../src/utils/confidence-score.js";

export const generateConfidence = () => {

  const companyExists =
    Math.random() > 0.02;

  const roleExists =
    Math.random() > 0.02;

  const levelExists =
    Math.random() > 0.03;

  const locationExists =
    Math.random() > 0.02;

  const salaryInRange =
    Math.random() > 0.15;

  const isDuplicate =
    Math.random() > 0.20;

  return calculateConfidenceScore({
    companyExists,
    roleExists,
    levelExists,
    locationExists,
    salaryInRange,
    isDuplicate,
  });
};