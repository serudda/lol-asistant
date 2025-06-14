import { ResponseStatus } from '@lol-assistant/api';
import { getChampionSlugList } from '../common/ddragon';
import type { SyncChampionResult } from '../common/types';
import { getLastestPatch } from '../db/getLastestPatch';
import { FLOW_ID } from './common/constants';
import { updateChampionImage } from './common/updateChampionImage';

export const updateAllChampionsImageCore = async (): Promise<void> => {
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
    throw new Error(`[${FLOW_ID}] [FETCH CHAMPIONS] No champions found in the response`);
  }

  // ------------------------------------------------------------

  console.log(
    `[${FLOW_ID}] [BUILDING IMAGES] Building splash and thumbnail URLs for ${championSlugs.length} champions...`,
  );
  const result: SyncChampionResult = {
    total: championSlugs.length,
    success: 0,
    failed: [],
  };

  for (const slug of championSlugs) {
    await updateChampionImage(patchVersion, slug);
    result.success++;
  }

  // ------------------------------------------------------------

  // Log summary
  console.log(`[${FLOW_ID}] [Summary] Update completed:`);
  console.log(`[${FLOW_ID}] [Summary] - Total champions: ${result.total}`);
  console.log(`[${FLOW_ID}] [Summary] - Successfully updated: ${result.success}`);
  if (result.failed.length > 0) {
    console.log(`[${FLOW_ID}] [Summary] Failed champions:`);
    result.failed.forEach(({ slug, error, attempts }) => {
      console.log(`[${FLOW_ID}] [Summary] - ${slug} (${attempts} attempts): ${error}`);
    });
  }

  // ------------------------------------------------------------

  console.log(`[${FLOW_ID}] [END] Process completed successfully`);
};
