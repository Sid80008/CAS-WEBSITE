const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const enquiries = await prisma.admissionEnquiry.findMany();
  console.log("\n=== All Enquiries ===");
  enquiries.forEach(e => console.log(`${e.id} | ${e.studentName} | ${e.parentName}`));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
