import { saveChampion } from './updateChampionStats/api/saveChampion';
import { getChampionRawData } from './updateChampionStats/common/getChampionRawData';
import { parseChampionRawData } from './updateChampionStats/common/parseChampionRawData';

const scriptId = '🛠️  updateChampionStats';

interface UpdateChampionStatsArgs {
  patchVersion: string;
  championSlug: string;
}

/**
 * Main function to update champion stats for a specific
 * patch version.
 */
export const updateChampionStats = async ({ patchVersion, championSlug }: UpdateChampionStatsArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting update for version: ${patchVersion}`);

  try {
    // Fetch champion data from Data Dragon API
    console.log(`[${scriptId}] [Fetching Data Dragon] Fetching data for champion: ${championSlug}`);
    const rawChampionData = await getChampionRawData(championSlug, patchVersion);

    // ------------------------------------------------------------

    // Parse champion data
    console.log(`[${scriptId}] [Parsing Champion Data] Extracting valuable stats for ${championSlug}`);
    const parsedChampion = parseChampionRawData(rawChampionData, patchVersion);

    // ------------------------------------------------------------

    // Save champion data to database
    console.log(`[${scriptId}] [Saving Champion Data] Saving stats for ${championSlug}`);
    await saveChampion(parsedChampion, patchVersion);

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

export default updateChampionStats;

/*
  Run the script `pnpm script:run updateChampionStats patchVersion=<game_version> championSlug=<champion_slug>`
 
  Example: `pnpm script:run updateChampionStats patchVersion=14.1.1 championSlug=ahri`
 
  This script fetches champion data from the League of
  Legends Data Dragon API for a specific version, processes
  it, and saves/updates it in the database.
 */
