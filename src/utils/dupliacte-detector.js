import prisma from "../config/db.js";

export const isDuplicateSubmission = async ({
  companyId,
  roleId,
  levelId,
  locationId,
  totalCompensation,
}) => {
  const THIRTY_DAYS = 30;

  const dateThreshold = new Date();

  dateThreshold.setDate(
    dateThreshold.getDate() - THIRTY_DAYS
  );

  const submissions =
    await prisma.compensationSubmission.findMany({
      where: {
        companyId,
        roleId,
        levelId,
        locationId,

        createdAt: {
          gte: dateThreshold,
        },
      },

      select: {
        totalCompensation: true,
      },
    });

  if (!submissions.length) {
    return false;
  }

  const duplicate = submissions.some(
    (submission) => {
      const existing =
        Number(submission.totalCompensation);

      const incoming =
        Number(totalCompensation);

      const difference =
        Math.abs(existing - incoming);

      const percentage =
        (difference / existing) * 100;

      return percentage <= 5;
    }
  );

  return duplicate;
};