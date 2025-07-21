import { FLOW_ID } from './common/constants';
import { enqueueChampionScrapeCore } from './enqueueChampionScrape.core';

export const enqueueChampionScrape = async (): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting enqueueChampionScrape process...`);
  try {
    await enqueueChampionScrapeCore();
    console.log(`[CLI][${FLOW_ID}] Patch note processed successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(`[CLI][${FLOW_ID}] Error:`, err);
    process.exit(1);
  }
};

/**
 * The entry point for this script is in
 * `src/scripts/enqueueChampionScrape.entry.ts`
 */
