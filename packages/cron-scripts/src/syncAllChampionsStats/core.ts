import { ResponseStatus } from '@lol-assistant/api';
import { getChampionSlugList } from '../common/ddragon';
import type { SyncChampionResult } from '../common/types';
import { FLOW_ID, MAX_RETRIES, RETRY_DELAY_MS } from './common/constants';
import { updateChampionStats } from './common/updateChampionStats';
import { getLastestPatch } from './db/getLastestPatch';

/**
 * Attempts to update a champion with retries.
 *
 * @returns true if successful, false if all retries failed.
 */
async function updateChampionWithRetry(
  slug: string,
  patchVersion: string,
  result: SyncChampionResult,
): Promise<boolean> {
  let attempts = 0;
  let lastError: Error | null = null;

  while (attempts < MAX_RETRIES) {
    attempts++;
    try {
      console.log(`[${FLOW_ID}] [Processing] Updating ${slug} (attempt ${attempts}/${MAX_RETRIES})...`);
      await updateChampionStats({ championSlug: slug, patchVersion });
      return true;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `[${FLOW_ID}] [Processing] Attempt ${attempts}/${MAX_RETRIES} failed for ${slug}:`,
        lastError.message,
      );

      if (attempts < MAX_RETRIES) {
        console.log(`[${FLOW_ID}] [Processing] Retrying ${slug} in ${RETRY_DELAY_MS}ms...`);
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

export const syncAllChampionsStatsCore = async (): Promise<void> => {
  console.log(`[${FLOW_ID}] [START] Process started`);

  // ------------------------------------------------------------

  // 1. Get the latest patch version
  const latestPatch = await getLastestPatch();
  if (latestPatch.result.status !== ResponseStatus.SUCCESS) {
    console.error(`[${FLOW_ID}] [GET_LATEST_PATCH] Error fetching latest patch: ${latestPatch.result.error?.message}`);
    throw new Error(latestPatch.result.error?.message ?? 'Unknown error');
  }
  const patchVersion = latestPatch.result.patchNote?.patchVersion as string;

  // ------------------------------------------------------------

  // 2. Fetch the list of champion slugs
  console.log(`[${FLOW_ID}] [FETCH CHAMPIONS] Fetching master champion list...`);
  const championSlugs = await getChampionSlugList(patchVersion);
  if (championSlugs.length === 0) {
    throw new Error('[${FLOW_ID}] [FETCH CHAMPIONS] No champions found in the response');
  }

  // ------------------------------------------------------------

  // 3. Process each champion
  // Process each champion
  console.log(`[${FLOW_ID}] [PROCESSING] Processing ${championSlugs.length} champions...`);
  const result: SyncChampionResult = {
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
  console.log(`[${FLOW_ID}] [Summary] Sync completed:`);
  console.log(`[${FLOW_ID}] [Summary] - Total champions: ${result.total}`);
  console.log(`[${FLOW_ID}] [Summary] - Successfully updated: ${result.success}`);
  console.log(`[${FLOW_ID}] [Summary] - Failed after ${MAX_RETRIES} attempts: ${result.failed.length}`);
  if (result.failed.length > 0) {
    console.log(`[${FLOW_ID}] [Summary] Failed champions:`);
    result.failed.forEach(({ slug, error, attempts }) => {
      console.log(`[${FLOW_ID}] [Summary] - ${slug} (${attempts} attempts): ${error}`);
    });
  }

  // ------------------------------------------------------------

  console.log(`[${FLOW_ID}] [END] Process completed successfully`);
};
