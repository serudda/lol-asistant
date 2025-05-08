import { ResponseStatus } from '@lol-assistant/api';
import { createClient } from '../../../utils/trpc-client';
import type { Sources } from './constants';
import { sourceCounterToSourceMatchupStatDto } from './dtos';
import type { SourceCounter } from './types';

/**
 * Centralized function to map SourceCounter[] to DTOs and
 * save them in the DB.
 *
 * @param params - Object with counters, championMatchupId,
 *   sourceSlug, scrapedAt.
 */
export const saveSourceMatchupStats = async ({
  counters,
  championMatchupId,
  sourceSlug,
  scrapedAt,
}: {
  counters: SourceCounter[];
  championMatchupId: string;
  sourceSlug: Sources;
  scrapedAt: string;
}): Promise<void> => {
  try {
    console.log(
      `[saveSourceMatchupStats] - Processing ${counters.length} source matchup stats for source '${sourceSlug}'...`,
    );

    // Use the centralized TRPC client
    const client = createClient();

    // Get the source by slug
    const sourceResp = await client.source.getBySlug.query({ slug: sourceSlug });
    if (!sourceResp || sourceResp.result.status !== ResponseStatus.SUCCESS || !sourceResp.result.source) {
      throw new Error(`[saveSourceMatchupStats] - Source not found or not SUCCESS for slug: ${sourceSlug}`);
    }

    // Save the matchup stats
    const sourceId = sourceResp.result.source.id;

    // Map the counters to DTOs and save them in the DB
    for (const counter of counters) {
      const dto = sourceCounterToSourceMatchupStatDto(counter, championMatchupId, sourceId, scrapedAt);
      const result = await client.sourceMatchupStat.create.mutate(dto);
      if (result.result.status === ResponseStatus.SUCCESS) {
        console.log(`[saveSourceMatchupStats] - Source matchup stat saved successfully.`);
      } else {
        console.error(`[saveSourceMatchupStats] - Error saving source matchup stat:`, result.result.error);
      }
    }
  } catch (error) {
    console.error(`[saveSourceMatchupStats] - Error processing source matchup stats:`, error);
    throw error;
  }
};
