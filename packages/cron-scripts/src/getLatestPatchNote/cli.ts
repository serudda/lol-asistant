import { FLOW_ID } from './common/constants';
import { getLatestPatchNoteCore } from './core';

export const getLatestPatchNote = async (): Promise<void> => {
  console.log(`[CLI][${FLOW_ID}] Starting getLatestPatchNote process...`);
  try {
    await getLatestPatchNoteCore();
    console.log(`[CLI][${FLOW_ID}] Patch note processed successfully.`);
    process.exit(0);
  } catch (err) {
    console.error(`[CLI][${FLOW_ID}] Error:`, err);
    process.exit(1);
  }
};
