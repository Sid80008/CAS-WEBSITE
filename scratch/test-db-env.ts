import { PrismaClient } from "@prisma/client";

async function testConnection() {
  const url = "postgresql://postgres.uwgqjuhwaaucyyjnrrvc:centralacademyantah@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
  
  const prisma = new PrismaClient({
    datasourceUrl: url,
  });

  try {
    console.log("Testing connection with password from .env and pgbouncer=true...");
    await prisma.$connect();
    console.log("Successfully connected!");
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
    
    // Check for a specific user to be sure
    const adminUser = await prisma.user.findUnique({ where: { email: "admin@centralacademy.com" } });
    console.log("Admin user found:", !!adminUser);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
