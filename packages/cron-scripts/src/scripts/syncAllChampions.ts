import { getChampionSlugs } from './syncAllChampions/common/getChampionSlugs';
import { updateChampionStats } from './updateChampionStats';

const scriptId = '🛠️  syncAllChampions';

interface SyncAllChampionsArgs {
  patchVersion: string;
}

interface SyncResult {
  total: number;
  success: number;
  failed: Array<{
    slug: string;
    error: string;
    attempts: number;
  }>;
}

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second between retries

/**
 * Attempts to update a champion with retries.
 *
 * @returns true if successful, false if all retries failed.
 */
async function updateChampionWithRetry(slug: string, patchVersion: string, result: SyncResult): Promise<boolean> {
  let attempts = 0;
  let lastError: Error | null = null;

  while (attempts < MAX_RETRIES) {
    attempts++;
    try {
      console.log(`[${scriptId}] [Processing] Updating ${slug} (attempt ${attempts}/${MAX_RETRIES})...`);
      await updateChampionStats({ championSlug: slug, patchVersion });
      return true;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `[${scriptId}] [Processing] Attempt ${attempts}/${MAX_RETRIES} failed for ${slug}:`,
        lastError.message,
      );

      if (attempts < MAX_RETRIES) {
        console.log(`[${scriptId}] [Processing] Retrying ${slug} in ${RETRY_DELAY_MS}ms...`);
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }
  }

  // If we get here, all retries failed
  result.failed.push({
    slug,
    error: lastError?.message ?? 'Unknown error',
    attempts,
  });
  return false;
}

/**
 * Main function to sync all champions for a specific patch
 * version.
 */
export const syncAllChampions = async ({ patchVersion }: SyncAllChampionsArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting sync all champions for version: ${patchVersion}`);

  try {
    // ------------------------------------------------------------

    // Fetch all champion slugs
    console.log(`[${scriptId}] [Fetching] Fetching master champion list...`);
    const championSlugs = await getChampionSlugs(patchVersion);
    console.log(`[${scriptId}] [Fetching] Found ${championSlugs.length} champions`);

    // ------------------------------------------------------------

    // Process each champion
    console.log(`[${scriptId}] [Processing] Processing ${championSlugs.length} champions...`);
    const result: SyncResult = {
      total: championSlugs.length,
      success: 0,
      failed: [],
    };

    for (const slug of championSlugs) {
      const success = await updateChampionWithRetry(slug, patchVersion, result);
      if (success) {
        result.success++;
      }
    }

    // ------------------------------------------------------------

    // Log summary
    console.log(`[${scriptId}] [Summary] Sync completed:`);
    console.log(`[${scriptId}] [Summary] - Total champions: ${result.total}`);
    console.log(`[${scriptId}] [Summary] - Successfully updated: ${result.success}`);
    console.log(`[${scriptId}] [Summary] - Failed after ${MAX_RETRIES} attempts: ${result.failed.length}`);
    if (result.failed.length > 0) {
      console.log(`[${scriptId}] [Summary] Failed champions:`);
      result.failed.forEach(({ slug, error, attempts }) => {
        console.log(`[${scriptId}] [Summary] - ${slug} (${attempts} attempts): ${error}`);
      });
    }

    // ------------------------------------------------------------

    console.log(`[${scriptId}] Successfully synchronized all champions for patch version: ${patchVersion}`);
  } catch (error) {
    console.error(`[${scriptId}] Failed to synchronize champions:`, error);
    process.exit(1);
  }
};

export default syncAllChampions;

/*
  Run the script `pnpm script:run syncAllChampions patchVersion=<game_version>`

  Example: `pnpm script:run syncAllChampions patchVersion=14.1.1`

  This script coordinates the process of fetching all champion data
  from the League of Legends Data Dragon API for a specific version,
  processing each champion individually, and saving/updating them in the database.
 */
