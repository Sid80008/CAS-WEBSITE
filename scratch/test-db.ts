import { PrismaClient } from "@prisma/client";

async function testConnection() {
  const baseUrl = "postgresql://postgres.uwgqjuhwaaucyyjnrrvc:centralacademy@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres";
  const url = baseUrl + (baseUrl.includes("?") ? "&" : "?") + "pgbouncer=true";
  
  const prisma = new PrismaClient({
    datasourceUrl: url,
  });

  try {
    console.log("Testing connection with pgbouncer=true...");
    console.log("URL:", url.replace(/:[^:@]+@/, ":****@")); // Mask password
    await prisma.$connect();
    console.log("Successfully connected!");
    const userCount = await prisma.user.count();
    console.log("User count:", userCount);
  } catch (error) {
    console.error("Connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
