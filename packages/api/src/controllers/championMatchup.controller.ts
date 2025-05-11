import { ResponseStatus, type ChampionMatchupIdsResponse, type Params } from '../common';
import type {
  CreateChampionMatchupInputType,
  GetAllIdsByPatchVersionInputType,
  GetChampionCountersInputType,
} from '../schemas/championMatchup.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';
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

    // Calculate total matches
    const totalMatches = sourceStats.reduce((sum, s) => sum + s.matches, 0);

    // Calculate weighted win rate
    let weightedWinRate = 0;
    if (totalMatches > 0) {
      const weightedSum = sourceStats.reduce((sum, s) => sum + s.winRate * s.matches, 0);
      weightedWinRate = weightedSum / totalMatches;
    }

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
 * Get counters list for a champion with optional filters.
 *
 * @param ctx Ctx.
 * @param input { baseChampionId: string, role:
 *   RoleEnumType, rankTier: RankTierEnumType }
 * @returns Array of counters.
 */
export const getChampionCountersHandler = async ({ ctx, input }: Params<GetChampionCountersInputType>) => {
  const handlerId = 'getChampionCountersHandler';
  try {
    const { baseChampionId, role, rankTier } = input;

    // Check if champion exists
    const champion = await ctx.prisma.champion.findUnique({ where: { id: baseChampionId } });
    if (!champion) {
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);
    }

    // Get all counters for the champion
    const matchups = await ctx.prisma.championMatchup.findMany({
      where: {
        baseChampionId: baseChampionId,
        role: role,
        rankTier: rankTier,
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

    // Map matchups to counters
    const counters = matchups.map((matchup) => ({
      opponentChampion: {
        id: matchup.opponentChampion.id,
        name: matchup.opponentChampion.name,
        slug: matchup.opponentChampion.slug,
        imageUrl: matchup.opponentChampion.imageUrl,
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
