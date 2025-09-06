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

// Use DATABASE_POSTGRES_URL_NO_SSL if available, otherwise fall back to DATABASE_URL
const databaseUrl = env.DATABASE_POSTGRES_URL_NO_SSL || env.DATABASE_URL;

export const db: PrismaClient = databaseUrl
  ? (globalForPrisma.prisma ??
     new PrismaClient({
       log:
         env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
     }))
  : createMockDb();

// Log database connection status
console.log("🗄️ [DB] Database connection initialized");
console.log("🗄️ [DB] DATABASE_URL available:", !!env.DATABASE_URL);
console.log("🗄️ [DB] DATABASE_POSTGRES_URL_NO_SSL available:", !!env.DATABASE_POSTGRES_URL_NO_SSL);
console.log("🗄️ [DB] Using database URL:", databaseUrl ? "***SET***" : "NOT SET");
console.log("🗄️ [DB] NODE_ENV:", env.NODE_ENV);
console.log("🗄️ [DB] Using mock database:", !databaseUrl);

if (env.NODE_ENV !== "production" && databaseUrl) {
  globalForPrisma.prisma = db;
}
