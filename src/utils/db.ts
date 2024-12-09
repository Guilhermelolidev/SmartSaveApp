import { PrismaClient } from '@prisma/client';
export const db = new PrismaClient();
async function main() {
  //await db.user.deleteMany();
}
main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
