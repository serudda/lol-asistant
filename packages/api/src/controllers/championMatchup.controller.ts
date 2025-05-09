import { ResponseStatus, type Params } from '../common';
import type { CreateChampionMatchupInputType } from '../schemas/championMatchup.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';

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
    const { patchNoteId, baseChampionId, opponentChampionId, role, weightedWinRate, totalMatches } = input;

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
        baseChampionId_opponentChampionId_role_patchNoteId: {
          baseChampionId,
          opponentChampionId,
          role,
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
