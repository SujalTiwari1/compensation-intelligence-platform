import { PrismaClient } from "@prisma/client";

import { compensationBands } from "./data/compensation-bands.js";

import { randomBetween, randomItem } from "./helpers/random.js";

import { generateConfidence } from "./helpers/generate-confidence.js";

const prisma = new PrismaClient();

const RECORDS = 500;

async function main() {
  console.log("Starting compensation seed...");

  const users = await prisma.user.findMany();

  const companies = await prisma.company.findMany();

  const roles = await prisma.role.findMany();

  const levels = await prisma.level.findMany();

  const locations = await prisma.location.findMany();

  if (!users.length) {
    throw new Error("No users found.");
  }

  const submissions = [];

  for (let i = 0; i < RECORDS; i++) {
    const user = randomItem(users);

    const company = randomItem(companies);

    const role = randomItem(roles);

    const level = randomItem(levels);

    const location = randomItem(locations);

    const companyBand = compensationBands[company.name];

    const range = companyBand?.[level.name] || [1000000, 5000000];

    const [minComp, maxComp] = range;

    const totalCompensation = randomBetween(minComp, maxComp);

    const baseSalary = Math.floor(totalCompensation * 0.75);

    const bonus = Math.floor(totalCompensation * 0.1);

    const stock = totalCompensation - baseSalary - bonus;

    const { score: confidenceScore, status } = generateConfidence();

    const createdAt = new Date();

    createdAt.setDate(createdAt.getDate() - randomBetween(0, 180));

    submissions.push({
      userId: user.id,

      companyId: company.id,
      roleId: role.id,
      levelId: level.id,
      locationId: location.id,

      baseSalary,
      bonus,
      stock,

      totalCompensation,

      confidenceScore,

      verified: Math.random() > 0.8,

      status,

      source: "SYSTEM",

      createdAt,
    });
  }

  await prisma.compensationSubmission.createMany({
    data: submissions,
  });

  console.log(`${RECORDS} compensation records created`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
