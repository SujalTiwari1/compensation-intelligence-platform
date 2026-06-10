import prisma from "../../config/db.js";

export const roleRepository = {
  findAll: async (pagination) => {
    return prisma.role.findMany({
      ...pagination,
      orderBy: {
        name: "asc",
      },
    });
  },

  findById: async (id) => {
    return prisma.role.findUnique({
      where: {
        id,
      },
    });
  },

  findByName: async (name) => {
    return prisma.role.findUnique({
      where: {
        name,
      },
    });
  },

  create: async (data) => {
    return prisma.role.create({
      data,
    });
  },

  delete: async (id) => {
    return prisma.role.delete({
      where: {
        id,
      },
    });
  },
};
