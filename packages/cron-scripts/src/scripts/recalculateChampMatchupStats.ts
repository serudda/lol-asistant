import { ResponseStatus } from '@lol-assistant/api/src/common';
import { createClient } from '../utils/trpc-client';

const scriptId = '🛠️  recalculateChampMatchupStats';

interface RecalculateChampMatchupStatsArgs {
  patchVersion?: string;
}

export const recalculateChampMatchupStats = async ({ patchVersion }: RecalculateChampMatchupStatsArgs) => {
  // Use the centralized TRPC client
  const client = createClient();

  if (!patchVersion) {
    console.error(`[${scriptId}] Please provide a patchVersion as argument.`);
    process.exit(1);
  }

  console.log(`[${scriptId}] Starting recalculate champion matchup stats for version: ${patchVersion}`);

  // ------------------------------------------------------------

  // Get all championMatchup IDs for the patchVersion
  let championMatchupIds: string[] = [];
  try {
    const response = await client.championMatchup.getAllIdsByPatchVersion.query({ patchVersion });
    if (response.result.status !== ResponseStatus.SUCCESS) {
      console.error(`[${scriptId}] Failed to fetch championMatchup IDs for patchVersion: ${patchVersion}`);
      process.exit(1);
    }

    championMatchupIds = Array.isArray(response.result.championMatchupIds) ? response.result.championMatchupIds : [];
    console.log(
      `[${scriptId}] Found ${championMatchupIds.length} championMatchups to recalculate for patchVersion: ${patchVersion}.`,
    );
  } catch (err) {
    console.error(`[${scriptId}] Failed to fetch championMatchup IDs:`, err);
    process.exit(1);
  }

  // ------------------------------------------------------------

  // Recalculate stats for each
  console.log(`[${scriptId}] Recalculating stats for all processed matchups...`);

  // Navigate through all processed matchupIds and recalculate stats
  const results = await Promise.all(
    championMatchupIds.map(async (championMatchupId) => {
      try {
        const res = await client.championMatchup.calculateStats.mutate({ championMatchupId });
        if (res.result.status === ResponseStatus.SUCCESS && res.result.championMatchup) {
          const matchup = res.result.championMatchup;
          console.log(
            `[${scriptId}] [SUCCESS] ${championMatchupId} -> weightedWinRate: ${matchup.weightedWinRate}, totalMatches: ${matchup.totalMatches}`,
          );
          return { championMatchupId, success: true, data: matchup };
        } else {
          console.log(`[${scriptId}] [WARN] No data returned for ${championMatchupId}`);
          return { championMatchupId, success: false };
        }
      } catch (err) {
        console.error(`[${scriptId}] [ERROR] Failed for ${championMatchupId}:`, err);
        return { championMatchupId, success: false, error: err };
      }
    }),
  );

  // ------------------------------------------------------------

  // Summary
  const successCount = results.filter((result) => result.success).length;
  const failCount = results.length - successCount;
  console.log(`[${scriptId}] Summary: ${successCount} succeeded, ${failCount} failed.`);
  if (failCount > 0) {
    console.log(
      `[${scriptId}] Failed IDs:`,
      results.filter((r) => !r.success).map((r) => r.championMatchupId),
    );
  }
};

export default recalculateChampMatchupStats;

/*
  Run the script `pnpm script:run recalculateChampMatchupStats patchVersion=<game_version>`
 
  Example: `pnpm script:run recalculateChampMatchupStats patchVersion=14.1.1`
 
  This script recalculates the stats for all champion matchups
  for a specific patch version (weightedWinRate and totalMatches).
 */
