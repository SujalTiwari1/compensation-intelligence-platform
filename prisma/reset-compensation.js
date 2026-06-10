import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result =
    await prisma.compensationSubmission.deleteMany();

  console.log(
    `Deleted ${result.count} compensation records`
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });