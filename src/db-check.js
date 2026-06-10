import prisma from "./config/db.js";

async function main() {
  console.log(await prisma.company.count());
  console.log(await prisma.role.count());
  console.log(await prisma.level.count());
  console.log(await prisma.location.count());
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
