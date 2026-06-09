import prisma from "../../config/db.js";

export const locationRepository = {
  findAll: async () => {
    return prisma.location.findMany({
      orderBy: {
        city: "asc",
      },
    });
  },

  findById: async (id) => {
    return prisma.location.findUnique({
      where: {
        id,
      },
    });
  },

  findByCityAndCountry: async (
    city,
    country
  ) => {
    return prisma.location.findUnique({
      where: {
        city_country: {
          city,
          country,
        },
      },
    });
  },

  create: async (data) => {
    return prisma.location.create({
      data,
    });
  },

  delete: async (id) => {
    return prisma.location.delete({
      where: {
        id,
      },
    });
  },
};