import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
// globalThis has no `prisma` property in its type, so we cast through `unknown`
// (never `any` — CLAUDE.md rule) to attach one safely.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// Reuse the existing instance across hot reloads, or create the first one.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });
// Only cache on the global in dev. In production there's no hot reload,
// and we don't want to leak a mutable global.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}