import prisma from "../src/config/db.js";

const companies = [
  "Google",
  "Amazon",
  "Microsoft",
  "Meta",
  "Netflix",
  "Apple",
  "Adobe",
  "Uber",
  "Atlassian",
  "OpenAI",
];

const roles = [
  "Backend Engineer",
  "Frontend Engineer",
  "Full Stack Engineer",
  "Data Engineer",
  "ML Engineer",
];

const levels = ["Intern", "Junior", "Mid", "Senior", "Staff", "Principal"];

const locations = [
  { city: "Bangalore", country: "India" },
  { city: "Hyderabad", country: "India" },
  { city: "Mumbai", country: "India" },
  { city: "Pune", country: "India" },
  { city: "Delhi", country: "India" },
  { city: "Chennai", country: "India" },
  { city: "Kolkata", country: "India" },
  { city: "Remote", country: "India" },
];

async function main() {
  // Companies
  await prisma.company.createMany({
    data: companies.map((name) => ({
      name,
      normalizedName: name.toLowerCase(),
    })),
    skipDuplicates: true,
  });

  // Roles
  await prisma.role.createMany({
    data: roles.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // Levels
  await prisma.level.createMany({
    data: levels.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // Locations
  await prisma.location.createMany({
    data: locations,
    skipDuplicates: true,
  });

  console.log("✅ Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
