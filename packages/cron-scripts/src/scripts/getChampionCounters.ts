import type { MobalyticsRank, MobalyticsRole } from './getChampionCounters/mobalytics/common/constants';
import { getMobalyticsCounters } from './getChampionCounters/mobalytics/getMobalyticsCounters';

const scriptId = '🛠️  getChampionCounters';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: string;
  rank: string;
}

/**
 * Main function to get champion counters for a specific
 * patch version.
 */
export const getChampionCounters = async ({
  patchVersion,
  championSlug,
  role,
  rank,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion counters for version: ${patchVersion}`);

  try {
    // Get Mobalytics counters
    console.log(`[${scriptId}] [Fetching Mobalytics] Fetching data for champion: ${championSlug}`);
    const mobalyticsData = await getMobalyticsCounters(championSlug, role as MobalyticsRole, rank as MobalyticsRank);

    console.log('** Mobalytics Data **', mobalyticsData);

    // ------------------------------------------------------------

    // Parse champion data
    // console.log(`[${scriptId}] [Parsing Champion Data] Extracting valuable stats for ${championSlug}`);
    // const parsedChampion = parseChampionRawData(rawChampionData, patchVersion);

    // ------------------------------------------------------------

    // Save champion data to database
    // console.log(`[${scriptId}] [Saving Champion Data] Saving stats for ${championSlug}`);
    // await saveChampion(parsedChampion, patchVersion);

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
  Run the script `pnpm script:run getChampionCounters patchVersion=<game_version> championSlug=<champion_slug> role=<role> rank=<rank>`
 
  Example: `pnpm script:run getChampionCounters patchVersion=14.1.1 championSlug=ahri role=mid rank=platinum`
 
  This script fetches champion data from the League of
  Legends Data Dragon API for a specific version, processes
  it, and saves/updates it in the database.
 */
