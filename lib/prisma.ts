import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  const globalWithPrisma = global as typeof globalThis & { prisma?: PrismaClient };
  prisma = globalWithPrisma.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalWithPrisma.prisma = prisma;
}

export { prisma };
