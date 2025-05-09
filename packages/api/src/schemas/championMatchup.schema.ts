import { z, type TypeOf } from 'zod';

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
  role: z.string(),
  weightedWinRate: z.number().default(0),
  totalMatches: z.number().default(0),
});
export type CreateChampionMatchupInputType = TypeOf<typeof createChampionMatchupInput>;

// ------------------------------------------------------------

export const calculateChampionMatchupStatsInput = z.object({
  championMatchupId: z.string(),
});
export type CalculateChampionMatchupStatsInputType = TypeOf<typeof calculateChampionMatchupStatsInput>;
