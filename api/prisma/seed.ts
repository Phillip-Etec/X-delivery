import { PrismaClient, Gender } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

   const user1 = await prisma.user.upsert({
      where: { email: 'mike@jackson.real' },
      update: {},
      create: {
         name: 'Michael Jackson',
         gender: 'Masculine',
         birthday: new Date(1962, 12, 3),
         ssn: '123456789011',
         email: 'mike@jackson.real',
         password: 'AbcDef123!!',
         isActive: true,
         isAdmin: true
      }
   });

   console.log({ user1 });
}

// execute the main function
main()
   .catch(e => {
      console.error(e);
      process.exit(1);
   })
   .finally(async () => {
      // close Prisma Client at the end
      await prisma.$disconnect();
   });
