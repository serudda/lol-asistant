import { ResponseStatus, type Params, type SourceMatchupStatResponse } from '../common';
import type { CreateSourceMatchupStatInputType } from '../schemas/sourceMatchupStat.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';

// Domain identifier for error handling
const domain = 'SOURCE_MATCHUP_STAT';

/**
 * Create a source matchup record.
 *
 * @param ctx Ctx.
 * @param input CreateSourceMatchupStatInputType.
 * @returns SourceMatchupStat.
 */
export const createSourceMatchupStatHandler = async ({
  ctx,
  input,
}: Params<CreateSourceMatchupStatInputType>): Promise<SourceMatchupStatResponse> => {
  const handlerId = 'createSourceMatchupStatHandler';
  try {
    const { championMatchupId, sourceId, sourceChampionSlug, winRate, matches, sourceUrl, scrapedAt, sourceRankTier } =
      input;

    // Check if the source exists
    const source = await ctx.prisma.source.findUnique({ where: { id: sourceId } });
    if (!source) return errorResponse(domain, handlerId, ErrorCodes.Source.NoSource, ErrorMessages.Source.NoSource);

    // Create the source matchup stat
    const sourceMatchupStat = await ctx.prisma.sourceMatchupStat.create({
      data: {
        sourceId,
        sourceChampionSlug,
        sourceRankTier,
        sourceUrl,
        winRate,
        matches,
        championMatchupId,
        scrapedAt,
      },
    });

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        sourceMatchupStat,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
