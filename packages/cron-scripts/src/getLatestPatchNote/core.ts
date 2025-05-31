import { riotToPatchVersion } from '@lol-assistant/api';
import { summarizePatchHandler } from './ai/summarizePatch/handler';
import { FLOW_ID, PATCH_TAG_URL } from './common/constants';
import { scrapLatestPatchNotes } from './common/scrapLatestPatchNote';
import { saveNewPatch } from './db/saveNewPatch';

export const getLatestPatchNoteCore = async (): Promise<void> => {
  console.log(`[${FLOW_ID}] [START] Process started`);

  // ------------------------------------------------------------

  // 1. Scrape patch notes
  console.log(`[${FLOW_ID}] [SCRAPING] Fetching latest patch notes from Riot...`);
  const patchNotes = await scrapLatestPatchNotes(PATCH_TAG_URL);
  if (!patchNotes) {
    console.error(`[${FLOW_ID}] [SCRAPING] No patch notes found`);
    throw new Error('No patch notes found');
  }
  console.log(`[${FLOW_ID}] [SCRAPING] Patch notes fetched for patch: ${patchNotes.patchVersion}`);

  // ------------------------------------------------------------

  // 2. Convert Riot patch to canonical patch version
  console.log(`[${FLOW_ID}] [CONVERT] Converting Riot patch version...`);
  let patchVersion: string;
  try {
    patchVersion = riotToPatchVersion(patchNotes.patchVersion);
    console.log(`[${FLOW_ID}] [CONVERT] Canonical patch version: ${patchVersion}`);
  } catch (err) {
    console.error(`[${FLOW_ID}] [CONVERT] Failed to convert riot patch:`, err);
    throw err;
  }
  // ------------------------------------------------------------

  // 3. Summarize patch notes
  console.log(`[${FLOW_ID}] [AI] Summarizing patch notes...`);
  let summary: string;
  try {
    summary = await summarizePatchHandler(patchNotes.textOnly);
    console.log(`[${FLOW_ID}] [AI] Patch notes summarized`);
  } catch (err) {
    console.error(`[${FLOW_ID}] [AI] Error summarizing patch notes:`, err);
    throw err;
  }

  // ------------------------------------------------------------

  // 4. Save to DB
  console.log(`[${FLOW_ID}] [DB] Saving patch notes to database...`);
  try {
    await saveNewPatch(summary, patchVersion, patchNotes.patchVersion, patchNotes.publishedDate);
    console.log(`[${FLOW_ID}] [DB] Patch notes saved successfully`);
  } catch (err) {
    console.error(`[${FLOW_ID}] [DB] Error saving patch notes:`, err);
    throw err;
  }

  // ------------------------------------------------------------

  console.log(`[${FLOW_ID}] [END] Process completed successfully`);
};
