import { PrismaClient } from '@prisma/client';

// export default new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;
