// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const user = await prisma.user.create({
    data: {
      email: "demo@gmail.com",
      name: "demo",
    },
  });
  console.log("user", user);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
