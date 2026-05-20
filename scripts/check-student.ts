import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking DB Student model fields...");
  try {
    const student = await prisma.student.findFirst();
    console.log("Sample student:", student);
  } catch (error) {
    console.error("Error fetching student:", error);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
