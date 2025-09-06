import { PrismaClient } from "@prisma/client";

import { env } from "~/env.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a mock database for when DATABASE_URL is not available
const createMockDb = (): PrismaClient => {
  return {
    quizScore: {
      findMany: () => Promise.resolve([]),
      create: () => Promise.resolve({ 
        id: "mock", 
        name: "Mock", 
        score: 0, 
        total: 0, 
        createdAt: new Date() 
      }),
    },
  } as unknown as PrismaClient;
};

export const db: PrismaClient = env.DATABASE_URL
  ? (globalForPrisma.prisma ??
     new PrismaClient({
       log:
         env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
     }))
  : createMockDb();

if (env.NODE_ENV !== "production" && env.DATABASE_URL) {
  globalForPrisma.prisma = db;
}
