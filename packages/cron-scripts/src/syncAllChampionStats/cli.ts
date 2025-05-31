import { FLOW_ID } from './common/constants';
import { syncAllChampionsCore } from './core';

export const syncAllChampions = async (): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting updateChampionStats process...`);
  try {
    await syncAllChampionsCore();
    console.log(`[CLI][${FLOW_ID}] Champion stats updated successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(`[CLI][${FLOW_ID}] Error:`, err);
    process.exit(1);
  }
};
