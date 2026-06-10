import { ApiError } from "../../utils/api-error.js";

import { analyticsRepository } from "./analytics.repository.js";

import { calculateMedian } from "../../utils/median.js";

import { getBenchmarkStatus } from "../../utils/benchmark-status.js";

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

  //benchmark service
  getBenchmark: async ({
    roleId,
    levelId,
    locationId,
    currentCompensation,
  }) => {
    const records = await analyticsRepository.getBenchmarkData({
      roleId,
      levelId,
      locationId,
    });

    if (!records.length) {
      throw new ApiError(404, "Insufficient benchmark data");
    }

    const salaries = records.map((record) => Number(record.totalCompensation));

    const average = Math.round(
      salaries.reduce((acc, curr) => acc + curr, 0) / salaries.length,
    );

    const median = calculateMedian(salaries);

    const difference = currentCompensation - median;

    const percentageDifference = Number(
      ((difference / median) * 100).toFixed(2),
    );

    const status = getBenchmarkStatus(percentageDifference);

    return {
      market: {
        average,
        median,
        sampleSize: salaries.length,
      },

      comparison: {
        currentCompensation,

        difference,

        percentageDifference,

        status,
      },
    };
  },

  // company-comparison service

  compareCompanies: async ({ companyA, companyB }) => {
    const [companyAData, companyBData] = await Promise.all([
      analyticsRepository.getCompanyComparisonData(Number(companyA)),

      analyticsRepository.getCompanyComparisonData(Number(companyB)),
    ]);

    if (!companyAData.company) {
      throw new ApiError(404, "Company A not found");
    }

    if (!companyBData.company) {
      throw new ApiError(404, "Company B not found");
    }

    const medianA = calculateMedian(
      companyAData.salaries.map((item) => Number(item.totalCompensation)),
    );

    const medianB = calculateMedian(
      companyBData.salaries.map((item) => Number(item.totalCompensation)),
    );

    const avgA = Math.round(
      Number(companyAData.aggregates._avg.totalCompensation || 0),
    );

    const avgB = Math.round(
      Number(companyBData.aggregates._avg.totalCompensation || 0),
    );

    return {
      companyA: {
        id: companyAData.company.id,
        name: companyAData.company.name,

        submissionCount: companyAData.aggregates._count.id,

        averageCompensation: avgA,

        medianCompensation: medianA,

        minCompensation: Number(
          companyAData.aggregates._min.totalCompensation || 0,
        ),

        maxCompensation: Number(
          companyAData.aggregates._max.totalCompensation || 0,
        ),
      },

      companyB: {
        id: companyBData.company.id,
        name: companyBData.company.name,

        submissionCount: companyBData.aggregates._count.id,

        averageCompensation: avgB,

        medianCompensation: medianB,

        minCompensation: Number(
          companyBData.aggregates._min.totalCompensation || 0,
        ),

        maxCompensation: Number(
          companyBData.aggregates._max.totalCompensation || 0,
        ),
      },

      winner:
        avgA > avgB ? companyAData.company.name : companyBData.company.name,
    };
  },
};
