import prisma from "../../config/db.js";

export const authRepository = {
  findUserByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  createUser: async (data) => {
    return prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },

  findUserById: async (id) => {
    return prisma.user.findUnique({
      where: { id },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  },
};