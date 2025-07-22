import { ResponseStatus } from '@lol-assistant/api/src/common';
import {
  getChampionSlugForSource,
  normalizeChampionSlugFromSource,
  Sources,
  toMobalyticsRank,
  toMobalyticsRole,
} from '../common';
import { createClient } from '../utils/trpc-client';
import { createChampionMatchup } from './getChampionCounters/common/createChampionMatchup';
import { saveSourceMatchupStats } from './getChampionCounters/common/saveSourceMatchupStats';
import { getMobalyticsCounters } from './getChampionCounters/mobalytics/getMobalyticsCounters';
import type { LoLChampionRole, RankTier } from '@prisma/client';
import dedent from 'dedent';

const scriptId = '🛠️  getMobalyticsMatchupStats';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
  allowUpdate?: boolean;
}

/**
 * Main function to get matchup stats for a specific patch
 * version.
 */
export const getMobalyticsMatchupStats = async ({
  patchVersion,
  championSlug,
  role,
  rankTier,
  allowUpdate = false,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion counters for version: ${patchVersion}`);

  // Collect unique championMatchupIds
  const processedMatchupIds = new Set<string>();

  try {
    // Use the centralized TRPC client
    const client = createClient();

    if (!allowUpdate) {
      // Early skip if already exists this matchup stat
      const skipResp = await client.sourceMatchupStat.alreadyExists.query({
        baseChampionSlug: championSlug,
        role,
        rankTier,
        patchVersion,
        sourceSlug: Sources.MOBALYTICS,
      });
      if (skipResp.result.status === ResponseStatus.SUCCESS && skipResp.result.exists) {
        console.log(
          dedent`
        ********* SKIPPING *********
        [${scriptId}] Stats already present for ** ${championSlug}, ${role}, ${rankTier}, ${patchVersion} **, skipping.
        ****************************`,
        );
        return;
      }
    }

    // ----------------------------

    // Get Mobalytics counters
    const mobalyticsRole = toMobalyticsRole(role);
    const mobalyticsRank = toMobalyticsRank(rankTier);
    const mobalyticsChampionSlug = getChampionSlugForSource(championSlug, Sources.MOBALYTICS);
    console.log(`[${scriptId}] [Fetching Mobalytics] Fetching data for champion: ${mobalyticsChampionSlug}`);
    const mobalyticsData = await getMobalyticsCounters(mobalyticsChampionSlug, mobalyticsRole, mobalyticsRank);

    for (const counter of mobalyticsData) {
      try {
        const championMatchupId = await createChampionMatchup({
          baseChampionSlug: championSlug,
          opponentChampionSlug: normalizeChampionSlugFromSource(counter.sourceChampionSlug, Sources.MOBALYTICS),
          patchVersion,
          role,
          rankTier,
        });

        processedMatchupIds.add(championMatchupId);

        await saveSourceMatchupStats({
          counter,
          championMatchupId,
          sourceSlug: Sources.MOBALYTICS,
          sourceChampionSlug: counter.sourceChampionSlug,
          scrapedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(
          `[${scriptId}] [Mobalytics] Failed to process counter for opponent '${counter.sourceChampionSlug}':`,
          error,
        );
      }
    }

    console.log(`[${scriptId}] Successfully processed stats for ${championSlug}`);
  } catch (error) {
    // Error handling will be refined in later tasks to allow continuation
    console.error(`[${scriptId}] Failed to process champion ${championSlug}:`, error);
    // For now, exit on first error during refactoring stage
    process.exit(1);
  }

  console.log(`[${scriptId}] Finished update process for version: ${patchVersion}`);
};
export default getMobalyticsMatchupStats;

/*
  Run the script `pnpm script:run getMobalyticsMatchupStats patchVersion=<game_version> championSlug=<champion_slug> role=<role> rankTier=<rank_tier>`
 
  Example: `pnpm script:run getMobalyticsMatchupStats patchVersion=14.1.1 championSlug=ahri role=mid rankTier=platinum`
 
  This script fetches champion counters from the following source:
  - Mobalytics

 */
