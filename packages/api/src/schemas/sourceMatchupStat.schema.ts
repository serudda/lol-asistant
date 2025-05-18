import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { z, type TypeOf } from 'zod';

export const rankTierEnum = z.nativeEnum(RankTier);
export type RankTierEnumType = TypeOf<typeof rankTierEnum>;

export const roleEnum = z.nativeEnum(LoLChampionRole);
export type RoleEnumType = TypeOf<typeof roleEnum>;

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
