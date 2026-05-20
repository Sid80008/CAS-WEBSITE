import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking DB connection...");
  try {
    const roles = await prisma.role.findMany();
    console.log("Roles found in DB:", roles);

    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
    console.log(`Users found: ${users.length}`);
    for (const u of users) {
      console.log(`- Email: ${u.email}, Roles: ${u.roles.map(r => r.role.name).join(', ')}`);
    }
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
