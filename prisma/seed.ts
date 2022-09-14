import { PrismaClient } from '@prisma/client';

console.log('Seeding...');

const prisma = new PrismaClient();

const main = async () => {
  console.log('Creating example client');
  const clientsCount = await prisma.client.count();
  if (clientsCount === 0) {
    await prisma.client.create({
      data: {
        client_id: 'client_id',
        client_secret: 'oauthsecret',
      },
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
