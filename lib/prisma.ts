import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  miniiChiglelPrisma?: PrismaClient;
};

export function getPrisma() {
  if (globalForPrisma.miniiChiglelPrisma) {
    return globalForPrisma.miniiChiglelPrisma;
  }

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required before Prisma can connect.");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.miniiChiglelPrisma = prisma;
  }

  return prisma;
}
