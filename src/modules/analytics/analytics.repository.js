import prisma from "../../config/db.js";

export const analyticsRepository = {
  findCompanyById: async (companyId) => {
    return prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
  },

  getCompensationAggregates: async (companyId) => {
    return prisma.compensationSubmission.aggregate({
      where: {
        companyId,
      },

      _count: {
        id: true,
      },

      _avg: {
        totalCompensation: true,
      },

      _min: {
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },
    });
  },

  getStatusBreakdown: async (companyId) => {
    return prisma.compensationSubmission.groupBy({
      by: ["status"],

      where: {
        companyId,
      },

      _count: {
        status: true,
      },
    });
  },

  getLevelBreakdown: async (companyId) => {
    return prisma.compensationSubmission.groupBy({
      by: ["levelId"],

      where: {
        companyId,
      },

      _count: true,
    });
  },

  getCompensationValues: async (companyId) => {
    return prisma.compensationSubmission.findMany({
      where: {
        companyId,
      },

      select: {
        totalCompensation: true,
      },

      orderBy: {
        totalCompensation: "asc",
      },
    });
  },

  //benchmark Repository

  getBenchmarkData: async ({ roleId, levelId, locationId }) => {
    return prisma.compensationSubmission.findMany({
      where: {
        roleId,
        levelId,
        locationId,

        status: "APPROVED",
      },

      select: {
        totalCompensation: true,
      },

      orderBy: {
        totalCompensation: "asc",
      },
    });
  },
  // company comparsion repo

  getCompanyComparisonData: async (companyId) => {
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });

    const aggregates = await prisma.compensationSubmission.aggregate({
      where: {
        companyId,
        status: "APPROVED",
      },

      _count: {
        id: true,
      },

      _avg: {
        totalCompensation: true,
      },

      _min: {
        totalCompensation: true,
      },

      _max: {
        totalCompensation: true,
      },
    });

    const salaries = await prisma.compensationSubmission.findMany({
      where: {
        companyId,
        status: "APPROVED",
      },

      select: {
        totalCompensation: true,
      },

      orderBy: {
        totalCompensation: "asc",
      },
    });

    return {
      company,
      aggregates,
      salaries,
    };
  },
};
