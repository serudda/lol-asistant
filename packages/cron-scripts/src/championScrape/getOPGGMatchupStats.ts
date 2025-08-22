import { ResponseStatus } from '@lol-assistant/api/src/common';
import { getChampionSlugForSource, normalizeChampionSlugFromSource, Sources } from '@lol-assistant/common';
import { toOPGGRank, toOPGGRole } from '../common';
import { createClient } from '../utils/trpc-client';
import { createChampionMatchup } from './getChampionCounters/common/createChampionMatchup';
import { saveSourceMatchupStats } from './getChampionCounters/common/saveSourceMatchupStats';
import { getOPGGCounters } from './getChampionCounters/opgg/getOPGGCounters';
import type { LoLChampionRole, RankTier } from '@prisma/client';
import dedent from 'dedent';

const scriptId = '🛠️  getOPGGMatchupStats';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
  allowUpdate?: boolean;
}

/**
 * Main function to get champion matchup stats for a
 * specific patch version.
 */
export const getOPGGMatchupStats = async ({
  patchVersion,
  championSlug,
  role,
  rankTier,
  allowUpdate = false,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion matchup stats for version: ${patchVersion}`);

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
        sourceSlug: Sources.OP_GG,
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

    // Get OP.GG counters
    const opggRole = toOPGGRole(role);
    const opggRank = toOPGGRank(rankTier);
    const opggChampionSlug = getChampionSlugForSource(championSlug, Sources.OP_GG);
    console.log(`[${scriptId}] [Fetching OP.GG] Fetching data for champion: ${opggChampionSlug}`);
    const opggData = await getOPGGCounters(opggChampionSlug, opggRole, opggRank);

    for (const counter of opggData) {
      try {
        const championMatchupId = await createChampionMatchup({
          baseChampionSlug: championSlug,
          opponentChampionSlug: normalizeChampionSlugFromSource(counter.sourceChampionSlug, Sources.OP_GG),
          patchVersion,
          role,
          rankTier,
        });

        processedMatchupIds.add(championMatchupId);

        await saveSourceMatchupStats({
          counter,
          championMatchupId,
          sourceSlug: Sources.OP_GG,
          sourceChampionSlug: counter.sourceChampionSlug,
          scrapedAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(
          `[${scriptId}] [OP.GG] Failed to process counter for opponent '${counter.sourceChampionSlug}':`,
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
export default getOPGGMatchupStats;

/*
  Run the script `pnpm script:run getOPGGMatchupStats patchVersion=<game_version> championSlug=<champion_slug> role=<role> rankTier=<rank_tier>`
 
  Example: `pnpm script:run getOPGGMatchupStats patchVersion=14.1.1 championSlug=ahri role=mid rankTier=platinum`
 
  This script fetches champion matchup stats from the following source:
  - OP.GG

  It then creates ChampionMatchup and SourceMatchupStat records for each counter.
  It also recalculates the stats for all processed matchups (weightedWinRate and totalMatches).
 */
