import { FLOW_ID } from './common/constants';
import { enqueueChampionScrapeCore } from './enqueueChampionScrape.core';

export const enqueueChampionScrape = async ({
  allowUpdate = false,
}: {
  allowUpdate?: boolean;
} = {}): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting enqueueChampionScrape process... (allowUpdate=${allowUpdate})`);
  try {
    await enqueueChampionScrapeCore({ allowUpdate });
    console.log(`[CLI][${FLOW_ID}] Champion scrape jobs enqueued successfully.`);
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
