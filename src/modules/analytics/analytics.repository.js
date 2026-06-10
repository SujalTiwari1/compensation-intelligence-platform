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

  //Dashboard Repo Layer
  getDashboardOverview: async () => {
    const [companies, roles, levels, locations, users] = await Promise.all([
      prisma.company.count(),
      prisma.role.count(),
      prisma.level.count(),
      prisma.location.count(),
      prisma.user.count(),
    ]);

    return {
      companies,
      roles,
      levels,
      locations,
      users,
    };
  },
  getDashboardSubmissionStats: async () => {
    const [total, approved, pendingReview, flagged] = await Promise.all([
      prisma.compensationSubmission.count(),

      prisma.compensationSubmission.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.compensationSubmission.count({
        where: {
          status: "PENDING_REVIEW",
        },
      }),

      prisma.compensationSubmission.count({
        where: {
          status: "FLAGGED",
        },
      }),
    ]);

    return {
      total,
      approved,
      pendingReview,
      flagged,
    };
  },

  getDashboardCompensationStats:
  async () => {

    return prisma.compensationSubmission.aggregate({

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

  getRecentSubmissions:
  async ({
    skip,
    take,
  }) => {

    const [
      submissions,
      total,
    ] = await Promise.all([

      prisma.compensationSubmission.findMany({

        skip,
        take,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          company: true,
          role: true,
          level: true,
          location: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),

      prisma.compensationSubmission.count(),
    ]);

    return {
      submissions,
      total,
    };
  },

  
};
