import prisma from "../../config/db.js";

export const compensationRepository = {
  create: async (data) => {
    return prisma.compensationSubmission.create({
      data,
      include: {
        company: true,
        role: true,
        level: true,
        location: true,
      },
    });
  },

  findById: async (id) => {
    return prisma.compensationSubmission.findUnique({
      where: {
        id,
      },
      include: {
        company: true,
        role: true,
        level: true,
        location: true,
      },
    });
  },

  findRecentSimilarSubmissions: async ({
    companyId,
    roleId,
    levelId,
    locationId,
  }) => {
    const threshold = new Date();

    threshold.setDate(
      threshold.getDate() - 30
    );

    return prisma.compensationSubmission.findMany({
      where: {
        companyId,
        roleId,
        levelId,
        locationId,
        createdAt: {
          gte: threshold,
        },
      },

      select: {
        totalCompensation: true,
      },
    });
  },

  findAll: async ({
    skip,
    take,
    userId,
  }) => {
    return prisma.compensationSubmission.findMany({
      where: {
        userId,
      },

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
      },
    });
  },
};