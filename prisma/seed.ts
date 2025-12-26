import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as argon from 'argon2';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const main = async () => {
  const hashedPassword = await argon.hash('asdfjkl');

  const user = await prisma.user.create({
    data: {
      email: 'admin@gmail.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  await prisma.employee.create({
    data: {
      userId: user.id,
      firstname: 'admin',
      lastname: 'admin',
      patronymic: 'admin',
      employmentDate: new Date(),
      birthdate: new Date(),
    },
  });
};

main()
  .then(() => {
    console.log('Prisma seeding completed');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
