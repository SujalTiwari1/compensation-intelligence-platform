import { ApiError } from "../../utils/api-error.js";

import { analyticsRepository } from "./analytics.repository.js";

import { calculateMedian } from "../../utils/median.js";

export const analyticsService = {
  getCompanyAnalytics: async (companyId) => {
    const company = await analyticsRepository.findCompanyById(
      Number(companyId),
    );

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const [aggregates, statusBreakdown, levelBreakdown, compensationValues] =
      await Promise.all([
        analyticsRepository.getCompensationAggregates(Number(companyId)),

        analyticsRepository.getStatusBreakdown(Number(companyId)),

        analyticsRepository.getLevelBreakdown(Number(companyId)),

        analyticsRepository.getCompensationValues(Number(companyId)),
      ]);

    const median = calculateMedian(
      compensationValues.map((item) => Number(item.totalCompensation)),
    );

    return {
      company: {
        id: company.id,
        name: company.name,
      },

      overview: {
        totalSubmissions: aggregates._count.id,
      },

      compensation: {
        average: Math.round(Number(aggregates._avg.totalCompensation || 0)),

        median,

        minimum: Number(aggregates._min.totalCompensation || 0),

        maximum: Number(aggregates._max.totalCompensation || 0),
      },

      statusBreakdown,

      levelBreakdown,
    };
  },
};
