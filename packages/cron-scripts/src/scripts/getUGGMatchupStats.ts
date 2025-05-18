import { ResponseStatus } from '@lol-assistant/api/src/common';
import { createClient } from '../utils/trpc-client';
import {
  getChampionSlugForSource,
  normalizeChampionSlugFromSource,
  Sources,
  toUGGRank,
  toUGGRole,
} from './getChampionCounters/common/constants';
import { createChampionMatchup } from './getChampionCounters/common/createChampionMatchup';
import { saveSourceMatchupStats } from './getChampionCounters/common/saveSourceMatchupStats';
import { getUGGCounters } from './getChampionCounters/ugg/getUGGCounters';
import type { LoLChampionRole, RankTier } from '@prisma/client';
import dedent from 'dedent';

const scriptId = '🛠️  getUGGMatchupStats';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
}

/**
 * Main function to get champion matchup stats for a
 * specific patch version.
 */
export const getUGGMatchupStats = async ({
  patchVersion,
  championSlug,
  role,
  rankTier,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion matchup stats for version: ${patchVersion}`);

  // Collect unique championMatchupIds
  const processedMatchupIds = new Set<string>();

  try {
    // Use the centralized TRPC client
    const client = createClient();

    // Early skip if already exists this matchup stat
    const skipResp = await client.sourceMatchupStat.alreadyExists.query({
      baseChampionSlug: championSlug,
      role,
      rankTier,
      patchVersion,
      sourceSlug: Sources.U_GG,
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

    // ----------------------------

    // Get U.GG counters
    const uggRole = toUGGRole(role);
    const uggRank = toUGGRank(rankTier);
    const uggChampionSlug = getChampionSlugForSource(championSlug, Sources.U_GG);
    console.log(`[${scriptId}] [Fetching U.GG] Fetching data for champion: ${uggChampionSlug}`);
    const uggData = await getUGGCounters(uggChampionSlug, uggRole, uggRank);

    for (const counter of uggData) {
      try {
        const championMatchupId = await createChampionMatchup({
          baseChampionSlug: championSlug,
          opponentChampionSlug: normalizeChampionSlugFromSource(counter.sourceChampionSlug, Sources.U_GG),
          patchVersion,
          role,
          rankTier,
        });

        processedMatchupIds.add(championMatchupId);

        await saveSourceMatchupStats({
          counter,
          championMatchupId,
          sourceSlug: Sources.U_GG,
          sourceChampionSlug: counter.sourceChampionSlug,
          scrapedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(
          `[${scriptId}] [U.GG] Failed to process counter for opponent '${counter.sourceChampionSlug}':`,
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
export default getUGGMatchupStats;

/*
  Run the script `pnpm script:run getUGGMatchupStats patchVersion=<game_version> championSlug=<champion_slug> role=<role> rankTier=<rank_tier>`
 
  Example: `pnpm script:run getUGGMatchupStats patchVersion=14.1.1 championSlug=ahri role=mid rankTier=platinum`
 
  This script fetches champion matchup stats from the following source:
  - U.GG

  It then creates ChampionMatchup and SourceMatchupStat records for each counter.
  It also recalculates the stats for all processed matchups (weightedWinRate and totalMatches).
 */
