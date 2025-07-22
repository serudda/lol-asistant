import { ResponseStatus } from '@lol-assistant/api';
import type { Sources } from '../../../common';
import { createClient } from '../../../utils/trpc-client';
import { sourceCounterToSourceMatchupStatDto } from './dtos';
import type { SourceCounter } from './types';

/**
 * Save a single SourceCounter as SourceMatchupStat in DB.
 *
 * @param params - Object with counter, championMatchupId,
 *   sourceSlug, scrapedAt.
 */
export const saveSourceMatchupStats = async ({
  counter,
  championMatchupId,
  sourceSlug,
  scrapedAt,
}: {
  counter: SourceCounter;
  championMatchupId: string;
  sourceSlug: Sources;
  sourceChampionSlug: string;
  scrapedAt: string;
}): Promise<void> => {
  try {
    console.log(`[saveSourceMatchupStats] - Saving source matchup stat for source '${sourceSlug}'...`);

    // Use the centralized TRPC client
    const client = createClient();

    // Get the source by slug
    const sourceResp = await client.source.getBySlug.query({ slug: sourceSlug });
    if (!sourceResp || sourceResp.result.status !== ResponseStatus.SUCCESS || !sourceResp.result.source) {
      throw new Error(`[saveSourceMatchupStats] - Source not found or not SUCCESS for slug: ${sourceSlug}`);
    }

    // Save the matchup stats
    const sourceId = sourceResp.result.source.id;

    const dto = sourceCounterToSourceMatchupStatDto(counter, championMatchupId, sourceId, scrapedAt);
    const result = await client.sourceMatchupStat.create.mutate(dto);
    if (result.result.status === ResponseStatus.SUCCESS) {
      console.log(`[saveSourceMatchupStats] - Source matchup stat saved successfully.`);
    } else {
      console.error(`[saveSourceMatchupStats] - Error saving source matchup stat:`, result.result.error);
    }
  } catch (error) {
    console.error(`[saveSourceMatchupStats] - Error processing source matchup stats:`, error);
    throw error;
  }
};
