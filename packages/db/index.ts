import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export {
  LoLChampionRole,
  Prisma,
  RankTier,
  type Account,
  type Champion,
  type Config,
  type PatchNote,
  type Source,
  type SourceMatchupStat,
  type SubscriptionFrequency,
  type SubscriptionPlanSlug,
  type User,
} from '@prisma/client';
export * from './common';
