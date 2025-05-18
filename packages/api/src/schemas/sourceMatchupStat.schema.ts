import { rankTierEnum, roleEnum } from './types';
import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const createSourceMatchupStatInput = z.object({
  championMatchupId: z.string(),
  sourceId: z.string(),
  sourceChampionSlug: z.string(),
  sourceRankTier: z.string(),
  winRate: z.number().min(0).max(100),
  matches: z.number().min(1),
  sourceUrl: z.string().url(),
  scrapedAt: z.string().datetime(),
});
export type CreateSourceMatchupStatInputType = TypeOf<typeof createSourceMatchupStatInput>;

/*------------------------------------*/

export const alreadyExistsSourceMatchupStatsInput = z.object({
  baseChampionSlug: z.string(),
  role: roleEnum,
  rankTier: rankTierEnum,
  patchVersion: z.string(),
  sourceSlug: z.string(),
});
export type AlreadyExistsSourceMatchupStatInputType = TypeOf<typeof alreadyExistsSourceMatchupStatsInput>;
