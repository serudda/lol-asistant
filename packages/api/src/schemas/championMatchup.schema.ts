import { LoLChampionRole, RankTier } from '@prisma/client';
import { z, type TypeOf } from 'zod';

export const rankTierEnum = z.nativeEnum(RankTier);
export type RankTierEnumType = TypeOf<typeof rankTierEnum>;

export const roleEnum = z.nativeEnum(LoLChampionRole);
export type RoleEnumType = TypeOf<typeof roleEnum>;

// ------------------------------------------------------------

export const getAllIdsByPatchVersionInput = z.object({
  patchVersion: z.string(),
});
export type GetAllIdsByPatchVersionInputType = TypeOf<typeof getAllIdsByPatchVersionInput>;

// ------------------------------------------------------------

export const createChampionMatchupInput = z.object({
  patchNoteId: z.string(),
  baseChampionId: z.string(),
  opponentChampionId: z.string(),
  role: roleEnum,
  rankTier: rankTierEnum,
  weightedWinRate: z.number().default(0),
  totalMatches: z.number().default(0),
});
export type CreateChampionMatchupInputType = TypeOf<typeof createChampionMatchupInput>;

// ------------------------------------------------------------

export const calculateChampionMatchupStatsInput = z.object({
  championMatchupId: z.string(),
});
export type CalculateChampionMatchupStatsInputType = TypeOf<typeof calculateChampionMatchupStatsInput>;

// ------------------------------------------------------------

export const getChampionCountersInput = z.object({
  opponentChampionSlug: z.string(),
  patchVersion: z.string().optional(),
  role: roleEnum.optional(),
  rankTier: rankTierEnum.optional(),
});
export type GetChampionCountersInputType = TypeOf<typeof getChampionCountersInput>;
