import prisma from "../src/config/db.js";
import bcrypt from "bcryptjs";
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

const users = [
  {
    name: "Demo User 1",
    email: "demo1@example.com",
    password: "Demo1234",
    role: "USER",
  },
  {
    name: "Demo User 2",
    email: "demo2@example.com",
    password: "Demo1234",
    role: "USER",
  },
  {
    name: "Demo User 3",
    email: "demo3@example.com",
    password: "Demo1234",
    role: "USER",
  },
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "Admin1234",
    role: "ADMIN",
  },
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

for (const user of users) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (existingUser) continue;

  const hashedPassword = await bcrypt.hash(user.password, 12);

  await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    },
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
