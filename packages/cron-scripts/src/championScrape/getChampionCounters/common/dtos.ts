import type { CreateSourceMatchupStatInputType } from '@lol-assistant/api';
import type { SourceCounter } from './types';

/**
 * Transforms a SourceCounter to a SourceMatchupStat input
 * format.
 *
 * @param counter The source counter data.
 * @param championMatchupId The ID of the champion matchup.
 * @param sourceId The ID of the source.
 * @returns SourceMatchupStat input data.
 */
export const sourceCounterToSourceMatchupStatDto = (
  counter: SourceCounter,
  championMatchupId: string,
  sourceId: string,
  scrapedAt: string,
): CreateSourceMatchupStatInputType => {
  return {
    championMatchupId,
    sourceId,
    sourceChampionSlug: counter.sourceChampionSlug,
    sourceRankTier: counter.sourceRankTier,
    winRate: counter.counterWinRate,
    matches: counter.matches,
    sourceUrl: counter.champUrl,
    scrapedAt,
  };
};
