import type { LoLChampionRole, RankTier } from '@lol-assistant/db';
import {
  ResponseStatus,
  type AlreadyExistsSourceMatchupStatResponse,
  type Params,
  type SourceMatchupStatResponse,
} from '../common';
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

/**
 * Check if we already have ANY SourceMatchupStat for a
 * given baseChampionSlug, role, rankTier, patchVersion and
 * sourceSlug.
 */
export const alreadyExistsSourceMatchupStatHandler = async ({
  ctx,
  input,
}: Params<{
  baseChampionSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
  patchVersion: string;
  sourceSlug: string;
}>): Promise<AlreadyExistsSourceMatchupStatResponse> => {
  const handlerId = 'alreadyExistsSourceMatchupStatHandler';
  try {
    const { baseChampionSlug, role, rankTier, patchVersion, sourceSlug } = input;

    // Check if the source exists
    const source = await ctx.prisma.source.findUnique({ where: { slug: sourceSlug } });
    if (!source) return errorResponse(domain, handlerId, ErrorCodes.Source.NoSource, ErrorMessages.Source.NoSource);

    // Check if the patch note exists
    const patch = await ctx.prisma.patchNote.findFirst({ where: { patchVersion } });
    if (!patch)
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NoPatchNote, ErrorMessages.PatchNote.NoPatchNote);

    // Check if the SourceMatchupStat already exists
    const exists = await ctx.prisma.sourceMatchupStat.findFirst({
      where: {
        sourceId: source.id,
        championMatchup: {
          patchNoteId: patch.id,
          role,
          rankTier,
          baseChampion: { slug: baseChampionSlug },
        },
      },
      select: { id: true },
    });

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        exists: Boolean(exists),
      },
    };
  } catch (error) {
    throw handleError(domain, handlerId, error);
  }
};
