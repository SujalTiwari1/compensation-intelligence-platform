import app from "./app.js";
import prisma from "./config/db.js";

const PORT = process.env.PORT || 5000;



async function testDb() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ DB Error:", error);
  }
}

testDb();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});