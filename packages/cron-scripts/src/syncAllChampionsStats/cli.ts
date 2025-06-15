import { FLOW_ID } from './common/constants';
import { syncAllChampionsStatsCore } from './core';

export const syncAllChampionsStats = async (): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting syncAllChampionsStats process...`);
  try {
    await syncAllChampionsStatsCore();
    console.log(`[CLI][${FLOW_ID}] Champion stats updated successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(`[CLI][${FLOW_ID}] Error:`, err);
    process.exit(1);
  }
};

/**
 * The entry point for this script is in
 * `src/scripts/syncAllChampionsStats.entry.ts`
 */
