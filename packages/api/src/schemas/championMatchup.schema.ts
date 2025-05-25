import { rankTierEnum, roleEnum } from './types';
import { z, type TypeOf } from 'zod';

// ------------------------------------------------------------

export const getAllIdsByPatchVersionInput = z.object({
  patchVersion: z.string(),
});
export type GetAllIdsByPatchVersionInputType = TypeOf<typeof getAllIdsByPatchVersionInput>;

// ------------------------------------------------------------

export const getAllIdsByChampionSlugInput = z.object({
  championSlug: z.string(),
  patchVersion: z.string(),
});
export type GetAllIdsByChampionSlugInputType = TypeOf<typeof getAllIdsByChampionSlugInput>;

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

// ------------------------------------------------------------

export const getMatchupOverviewInput = z.object({
  baseChampionSlug: z.string(),
  role: roleEnum,
  rankTier: rankTierEnum,
  patchVersion: z.string(),
});
export type GetMatchupOverviewInputType = TypeOf<typeof getMatchupOverviewInput>;
