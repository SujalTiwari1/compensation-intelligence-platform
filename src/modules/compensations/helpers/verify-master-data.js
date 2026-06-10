import prisma from "../../../config/db.js";

export const verifyMasterData =
  async ({
    companyId,
    roleId,
    levelId,
    locationId,
  }) => {

    const [
      company,
      role,
      level,
      location,
    ] = await Promise.all([
      prisma.company.findUnique({
        where: { id: companyId },
      }),

      prisma.role.findUnique({
        where: { id: roleId },
      }),

      prisma.level.findUnique({
        where: { id: levelId },
      }),

      prisma.location.findUnique({
        where: { id: locationId },
      }),
    ]);

    return {
      companyExists: !!company,
      roleExists: !!role,
      levelExists: !!level,
      locationExists: !!location,
    };
  };