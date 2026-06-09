import prisma from "../../config/db.js";

export const levelRepository = {
  findAll: async () => {
    return prisma.level.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },

  findById: async (id) => {
    return prisma.level.findUnique({
      where: {
        id,
      },
    });
  },

  findByName: async (name) => {
    return prisma.level.findUnique({
      where: {
        name,
      },
    });
  },

  create: async (data) => {
    return prisma.level.create({
      data,
    });
  },

  delete: async (id) => {
    return prisma.level.delete({
      where: {
        id,
      },
    });
  },
};