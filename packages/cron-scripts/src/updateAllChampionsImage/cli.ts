import { FLOW_ID } from './common/constants';
import { updateAllChampionsImageCore } from './core';

export const updateAllChampionsImage = async (): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting updateAllChampionsImage process...`);
  try {
    await updateAllChampionsImageCore();
    console.log(`[CLI][${FLOW_ID}] Champion image updated successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(`[CLI][${FLOW_ID}] Error:`, err);
    process.exit(1);
  }
};

/**
 * The entry point for this script is in
 * `src/scripts/updateAllChampionsImage.entry.ts`
 */
