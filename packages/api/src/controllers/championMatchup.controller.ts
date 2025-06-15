import {
  ResponseStatus,
  type ChampionCountersResponse,
  type ChampionMatchupIdsResponse,
  type MatchupOverviewResponse,
  type Params,
} from '../common';
import type {
  CreateChampionMatchupInputType,
  GetAllIdsByChampionSlugInputType,
  GetAllIdsByPatchVersionInputType,
  GetChampionCountersInputType,
  GetMatchupOverviewInputType,
} from '../schemas/championMatchup.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';
import { calculateWeightedWinRateWithPenalty } from '../utils';
import { getChampionBySlugHandler } from './champion.controller';
import { getPatchNoteByVersionHandler } from './patchNote.controller';

const domain = 'CHAMPION_MATCHUP';

/**
 * Create a champion matchup record.
 *
 * @param ctx Ctx.
 * @param input CreateChampionMatchupInputType.
 * @returns ChampionMatchup.
 */
export const createChampionMatchupHandler = async ({ ctx, input }: Params<CreateChampionMatchupInputType>) => {
  const handlerId = 'createChampionMatchupHandler';
  try {
    const { patchNoteId, baseChampionId, opponentChampionId, role, rankTier, weightedWinRate, totalMatches } = input;

    // Check if base champion exists
    const baseChampion = await ctx.prisma.champion.findUnique({ where: { id: baseChampionId } });
    if (!baseChampion) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.Champion.BaseChampionNotFound,
        ErrorMessages.Champion.BaseChampionNotFound,
      );
    }
    // Check if opponent champion exists
    const opponentChampion = await ctx.prisma.champion.findUnique({ where: { id: opponentChampionId } });
    if (!opponentChampion) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.Champion.OpponentChampionNotFound,
        ErrorMessages.Champion.OpponentChampionNotFound,
      );
    }
    // Check if patch note exists
    const patchNote = await ctx.prisma.patchNote.findUnique({ where: { id: patchNoteId } });
    if (!patchNote) {
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);
    }

    // Check if matchup already exists (unique constraint)
    const existing = await ctx.prisma.championMatchup.findUnique({
      where: {
        baseChampionId_opponentChampionId_role_rankTier_patchNoteId: {
          baseChampionId,
          opponentChampionId,
          role,
          rankTier,
          patchNoteId,
        },
      },
    });
    if (existing) {
      return {
        result: {
          status: ResponseStatus.SUCCESS,
          championMatchup: existing,
        },
      };
    }

    // Create the champion matchup
    const championMatchup = await ctx.prisma.championMatchup.create({
      data: {
        patchNoteId,
        baseChampionId,
        opponentChampionId,
        role,
        rankTier,
        weightedWinRate,
        totalMatches,
      },
    });

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        championMatchup,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Calculate weightedWinRate and totalMatches for a champion
 * matchup.
 *
 * @param ctx Ctx.
 * @param input { championMatchupId: string }
 * @returns Updated ChampionMatchup.
 */
export const calculateChampionMatchupStatsHandler = async ({ ctx, input }: Params<{ championMatchupId: string }>) => {
  const handlerId = 'calculateChampionMatchupStatsHandler';
  try {
    const { championMatchupId } = input;

    // Check if matchup exists
    const championMatchup = await ctx.prisma.championMatchup.findUnique({ where: { id: championMatchupId } });
    if (!championMatchup) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.ChampionMatchup.NoChampionMatchup,
        ErrorMessages.ChampionMatchup.NoChampionMatchup,
      );
    }

    // Get all source stats for this matchup
    const sourceStats = await ctx.prisma.sourceMatchupStat.findMany({
      where: { championMatchupId },
    });

    // Check if there are any source stats
    if (sourceStats.length === 0) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.SourceStats.NoSourceMatchupStats,
        ErrorMessages.SourceStats.NoSourceMatchupStats,
      );
    }

    // Get all matchups for the same base champion, role, rankTier, patchNote
    const allMatchups = await ctx.prisma.championMatchup.findMany({
      where: {
        baseChampionId: championMatchup.baseChampionId,
        role: championMatchup.role,
        rankTier: championMatchup.rankTier,
        patchNoteId: championMatchup.patchNoteId,
      },
      select: { totalMatches: true },
    });
    const allMatchupsTotalMatches = allMatchups.map((m) => m.totalMatches);

    // Calculate weighted win rate with penalty
    const { weightedWinRate, totalMatches } = calculateWeightedWinRateWithPenalty(sourceStats, allMatchupsTotalMatches);

    // Update the matchup
    const updated = await ctx.prisma.championMatchup.update({
      where: { id: championMatchupId },
      data: {
        weightedWinRate,
        totalMatches,
      },
    });

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        championMatchup: updated,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get all championMatchup IDs by patchVersion.
 *
 * @param ctx Ctx.
 * @param input { patchVersion: string }
 * @returns Array of championMatchup IDs.
 */
export const getAllIdsByPatchVersionHandler = async ({
  ctx,
  input,
}: Params<GetAllIdsByPatchVersionInputType>): Promise<ChampionMatchupIdsResponse> => {
  const handlerId = 'getAllIdsByPatchVersionHandler';
  try {
    const { patchVersion } = input;

    // Get patchNote by patchVersion
    const patchNoteResponse = await getPatchNoteByVersionHandler({ ctx, input: { patchVersion } });
    if (patchNoteResponse.result.status !== ResponseStatus.SUCCESS) {
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);
    }
    const patchNote = patchNoteResponse.result.patchNote;

    // Get all championMatchup IDs by patchNote ID
    const matchups = await ctx.prisma.championMatchup.findMany({ where: { patchNoteId: patchNote?.id } });

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        championMatchupIds: matchups.map((element) => element.id),
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get all championMatchup IDs by championSlug and
 * patchVersion.
 *
 * @param ctx Ctx.
 * @param input { championSlug: string, patchVersion: string
 *   }
 * @returns Array of championMatchup IDs.
 */
export const getAllIdsByChampionSlugHandler = async ({
  ctx,
  input,
}: Params<GetAllIdsByChampionSlugInputType>): Promise<ChampionMatchupIdsResponse> => {
  const handlerId = 'getAllIdsByChampionSlugHandler';
  try {
    const { championSlug, patchVersion } = input;

    // Get patchNote by patchVersion
    const patchNoteResponse = await getPatchNoteByVersionHandler({ ctx, input: { patchVersion } });
    if (patchNoteResponse.result.status !== ResponseStatus.SUCCESS) {
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);
    }
    const patchNote = patchNoteResponse.result.patchNote;

    // Get championMatchup IDs by championSlug and patchNote ID
    const matchups = await ctx.prisma.championMatchup.findMany({
      where: {
        baseChampion: { slug: championSlug },
        patchNoteId: patchNote?.id,
      },
    });

    // Check if there are any matchups
    if (matchups.length === 0) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.ChampionMatchup.NoChampionMatchup,
        ErrorMessages.ChampionMatchup.NoChampionMatchup,
      );
    }

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        championMatchupIds: matchups.map((element) => element.id),
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get counters list for a champion with optional filters.
 *
 * @param ctx Ctx.
 * @param input { baseChampionId: string, role:
 *   RoleEnumType, rankTier: RankTierEnumType }
 * @returns Array of counters.
 */
export const getChampionCountersHandler = async ({
  ctx,
  input,
}: Params<GetChampionCountersInputType>): Promise<ChampionCountersResponse> => {
  const handlerId = 'getChampionCountersHandler';
  try {
    const { opponentChampionSlug, role, rankTier, patchVersion } = input;

    // Check if champion exists
    const response = await getChampionBySlugHandler({ ctx, input: { slug: opponentChampionSlug } });
    if (response.result.status !== ResponseStatus.SUCCESS) {
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);
    }

    const champion = response.result.champion;

    // Get all counters for the champion
    const matchups = await ctx.prisma.championMatchup.findMany({
      where: {
        baseChampionId: champion?.id,
        role,
        rankTier,
        patchNote: {
          patchVersion,
        },
      },
      include: {
        opponentChampion: true,
        sourceStats: {
          include: { source: true },
        },
      },
    });

    // Check if there are any matchups
    if (matchups.length === 0) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.ChampionMatchup.NoCounters,
        ErrorMessages.ChampionMatchup.NoCounters,
      );
    }

    // Map matchups to counters, sort by weightedWinRate descending, and add rank
    const counters = matchups
      .sort((a, b) => b.weightedWinRate - a.weightedWinRate)
      .map((matchup, idx) => ({
        rank: idx + 1,
        opponentChampion: {
          id: matchup.opponentChampion.id,
          name: matchup.opponentChampion.name,
          slug: matchup.opponentChampion.slug,
          thumbnailUrl: matchup.opponentChampion.thumbnailUrl,
          splashUrl: matchup.opponentChampion.splashUrl,
          mainRoles: matchup.opponentChampion.mainRoles,
          lastPatchVersion: matchup.opponentChampion.lastPatchVersion,
        },
        role: matchup.role,
        rankTier: matchup.rankTier,
        weightedWinRate: matchup.weightedWinRate,
        totalMatches: matchup.totalMatches,
        sourceStats: matchup.sourceStats.map((stat) => ({
          winRate: stat.winRate,
          matches: stat.matches,
          sourceUrl: stat.sourceUrl,
          source: {
            name: stat.source.name,
            logoUrl: stat.source.logoUrl,
            baseUrl: stat.source.baseUrl,
          },
        })),
      }));

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        counters,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get the 5 easiest and 5 hardest matchups for a champion.
 * Returns { easiest: [...], hardest: [...] }
 */
export const getMatchupOverviewHandler = async ({
  ctx,
  input,
}: Params<GetMatchupOverviewInputType>): Promise<MatchupOverviewResponse> => {
  const handlerId = 'getMatchupOverviewHandler';
  try {
    // Get base champion
    const championResp = await getChampionBySlugHandler({ ctx, input: { slug: input.baseChampionSlug } });
    if (championResp.result.status !== ResponseStatus.SUCCESS || !championResp.result.champion) {
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);
    }
    const baseChampionId = championResp.result.champion.id;

    // Get all matchups for this champion/role/tier/patch
    const matchups = await ctx.prisma.championMatchup.findMany({
      where: {
        baseChampionId,
        role: input.role,
        rankTier: input.rankTier,
        patchNote: { patchVersion: input.patchVersion },
      },
      include: {
        opponentChampion: true,
      },
    });

    // Check if there are any matchups
    if (matchups.length === 0) {
      return errorResponse(
        domain,
        handlerId,
        ErrorCodes.ChampionMatchup.NoChampionMatchup,
        ErrorMessages.ChampionMatchup.NoChampionMatchup,
      );
    }

    // Sort for easiest (highest winrate) and hardest (lowest winrate)
    const hardest = [...matchups]
      .sort((a, b) => b.weightedWinRate - a.weightedWinRate)
      .slice(0, 5)
      .map((matchup) => ({
        opponentChampion: {
          id: matchup.opponentChampion.id,
          name: matchup.opponentChampion.name,
          slug: matchup.opponentChampion.slug,
          thumbnailUrl: matchup.opponentChampion.thumbnailUrl,
          splashUrl: matchup.opponentChampion.splashUrl,
          mainRoles: matchup.opponentChampion.mainRoles,
          lastPatchVersion: matchup.opponentChampion.lastPatchVersion,
        },
        weightedWinRate: matchup.weightedWinRate,
        totalMatches: matchup.totalMatches,
      }));
    const easiest = [...matchups]
      .sort((a, b) => a.weightedWinRate - b.weightedWinRate)
      .slice(0, 5)
      .map((matchup) => ({
        opponentChampion: {
          id: matchup.opponentChampion.id,
          name: matchup.opponentChampion.name,
          slug: matchup.opponentChampion.slug,
          thumbnailUrl: matchup.opponentChampion.thumbnailUrl,
          splashUrl: matchup.opponentChampion.splashUrl,
          mainRoles: matchup.opponentChampion.mainRoles,
          lastPatchVersion: matchup.opponentChampion.lastPatchVersion,
        },
        weightedWinRate: matchup.weightedWinRate,
        totalMatches: matchup.totalMatches,
      }));

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        easiest,
        hardest,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
