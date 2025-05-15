import { createClient } from '../utils/trpc-client';
import {
  getChampionSlugForSource,
  normalizeChampionSlugFromSource,
  Sources,
  toMobalyticsRank,
  toMobalyticsRole,
  toOPGGRank,
  toOPGGRole,
  toUGGRank,
  toUGGRole,
} from './getChampionCounters/common/constants';
import { createChampionMatchup } from './getChampionCounters/common/createChampionMatchup';
import { saveSourceMatchupStats } from './getChampionCounters/common/saveSourceMatchupStats';
import { getMobalyticsCounters } from './getChampionCounters/mobalytics/getMobalyticsCounters';
import { getOPGGCounters } from './getChampionCounters/opgg/getOPGGCounters';
import { getUGGCounters } from './getChampionCounters/ugg/getUGGCounters';
import type { LoLChampionRole, RankTier } from '@prisma/client';

const scriptId = '🛠️  getChampionCounters';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
}

/**
 * Main function to get champion counters for a specific
 * patch version.
 */
export const getChampionCounters = async ({
  patchVersion,
  championSlug,
  role,
  rankTier,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion counters for version: ${patchVersion}`);

  // Collect unique championMatchupIds
  const processedMatchupIds = new Set<string>();

  try {
    // Use the centralized TRPC client
    const client = createClient();

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

    // ------------------------------------------------------------

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

    // ------------------------------------------------------------

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

    // ------------------------------------------------------------

    // Recalculate stats for all processed matchups
    console.log(`[${scriptId}] Recalculating stats for all processed matchups...`);

    // Navigate through all processed matchupIds and recalculate stats
    const recalcResults = await Promise.all(
      Array.from(processedMatchupIds).map(async (championMatchupId) => {
        try {
          await client.championMatchup.calculateStats.mutate({ championMatchupId });
          console.log(`[${scriptId}] [SUCCESS] Recalculated stats for matchup ${championMatchupId}`);
          return { championMatchupId, success: true };
        } catch (err) {
          console.error(`[${scriptId}] [ERROR] Failed to recalculate stats for matchup ${championMatchupId}:`, err);
          return { championMatchupId, success: false, error: err };
        }
      }),
    );

    // Show a summary of the recalculation results
    const successCount = recalcResults.filter((r) => r.success).length;
    const failCount = recalcResults.length - successCount;
    console.log(`[${scriptId}] Recalculation summary: ${successCount} succeeded, ${failCount} failed.`);

    if (failCount > 0) {
      console.log(
        `[${scriptId}] Failed matchups:`,
        recalcResults.filter((r) => !r.success).map((r) => r.championMatchupId),
      );
    }

    // ------------------------------------------------------------

    console.log(`[${scriptId}] Successfully processed stats for ${championSlug}`);
  } catch (error) {
    // Error handling will be refined in later tasks to allow continuation
    console.error(`[${scriptId}] Failed to process champion ${championSlug}:`, error);
    // For now, exit on first error during refactoring stage
    process.exit(1);
  }

  console.log(`[${scriptId}] Finished update process for version: ${patchVersion}`);
};
export default getChampionCounters;

/*
  Run the script `pnpm script:run getChampionCounters patchVersion=<game_version> championSlug=<champion_slug> role=<role> rankTier=<rank_tier>`
 
  Example: `pnpm script:run getChampionCounters patchVersion=14.1.1 championSlug=ahri role=mid rankTier=platinum`
 
  This script fetches champion counters from the following sources:
  - Mobalytics
  - OP.GG
  - U.GG

  It then creates ChampionMatchup and SourceMatchupStat records for each counter.
  It also recalculates the stats for all processed matchups (weightedWinRate and totalMatches).
 */
