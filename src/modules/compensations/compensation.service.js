import { ApiError } from "../../utils/api-error.js";

import { calculateConfidenceScore } from "../../utils/confidence-score.js";

import { isSalaryInRange } from "../../utils/isSalaryInRange.js";

import { compensationRepository } from "./compensation.repository.js";

import { verifyMasterData } from "./helpers/verify-master-data.js";

import { getPagination } from "../../utils/pagination.js";

export const compensationService = {
  createSubmission: async (payload, userId) => {
    const { companyId, roleId, levelId, locationId, baseSalary, bonus, stock } =
      payload;

    const totalCompensation =
      Number(baseSalary) + Number(bonus) + Number(stock);

    const masterValidation = await verifyMasterData({
      companyId,
      roleId,
      levelId,
      locationId,
    });

    const allValid = Object.values(masterValidation).every(Boolean);

    if (!allValid) {
      throw new ApiError(400, "Invalid master data reference");
    }

    const salaryInRange = isSalaryInRange(totalCompensation);

    const recentSubmissions =
      await compensationRepository.findRecentSimilarSubmissions({
        companyId,
        roleId,
        levelId,
        locationId,
      });

    const isDuplicate = recentSubmissions.some((submission) => {
      const existing = Number(submission.totalCompensation);

      const difference = Math.abs(existing - totalCompensation);

      const percentage = (difference / existing) * 100;

      return percentage <= 5;
    });

    const { score, status } = calculateConfidenceScore({
      ...masterValidation,
      salaryInRange,
      isDuplicate,
    });

    return compensationRepository.create({
      userId,

      companyId,
      roleId,
      levelId,
      locationId,

      baseSalary,
      bonus,
      stock,

      totalCompensation,

      confidenceScore: score,

      status,
    });
  },

  getMySubmissions: async ({ userId, page = 1, limit = 10 }) => {
    const pagination = getPagination(page, limit);

    const submissions = await compensationRepository.findAll({
      userId,
      ...pagination,
    });

    return submissions;
  },

  getSubmissionById: async (id) => {
    const submission = await compensationRepository.findById(id);

    if (!submission) {
      throw new ApiError(404, "Submission not found");
    }

    return submission;
  },
};
