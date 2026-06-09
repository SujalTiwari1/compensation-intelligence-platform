import prisma from "../../config/db.js";

export const companyRepository = {
  findAll: async (pagination) => {
    return prisma.company.findMany({
      ...pagination,

      orderBy: {
        name: "asc",
      },
    });
  },

  findById: async (id) => {
    return prisma.company.findUnique({
      where: {
        id,
      },
    });
  },

  findByName: async (name) => {
    return prisma.company.findUnique({
      where: {
        name,
      },
    });
  },

  create: async (data) => {
    return prisma.company.create({
      data,
    });
  },

  delete: async (id) => {
    return prisma.company.delete({
      where: {
        id,
      },
    });
  },
};
