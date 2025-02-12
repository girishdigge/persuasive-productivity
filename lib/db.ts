import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

// import { PrismaClient } from '@prisma/client';

// declare global {
//   // eslint-disable-next-line no-var
//   var prisma: PrismaClient;
// }

// let prisma: PrismaClient;

// if (process.env.NODE_ENV !== 'production') prisma = new PrismaClient();
// else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// if (!global.prisma) {
//   global.prisma = new PrismaClient();
// }
// // eslint-disable-next-line prefer-const
// prisma = global.prisma;

// export const db = prisma;
