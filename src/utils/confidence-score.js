import { SubmissionStatus } from "@prisma/client";

export const calculateConfidenceScore = ({
  companyExists,
  roleExists,
  levelExists,
  locationExists,
  salaryInRange,
  isDuplicate,
}) => {
  let score = 0;

  if (companyExists) score += 20;
  if (roleExists) score += 15;
  if (levelExists) score += 15;
  if (locationExists) score += 15;
  if (salaryInRange) score += 20;
  if (!isDuplicate) score += 15;

  let status = SubmissionStatus.PENDING_REVIEW;

  if (score >= 80) {
    status = SubmissionStatus.APPROVED;
  } else if (score < 50) {
    status = SubmissionStatus.FLAGGED;
  }

  return {
    score,
    status,
  };
};