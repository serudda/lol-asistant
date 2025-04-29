import { summarizePatchHandler } from './getLatestPatchNote/ai/summarizePatch/handler';
import { saveNewPatch } from './getLatestPatchNote/api/saveNewPatch';
import { scrapLatestPatchNotes } from './getLatestPatchNote/common/scrapLatestPatchNote';

// Configuration constants
const BASE_URL = 'https://www.leagueoflegends.com';
const PATCH_TAG_URL = `${BASE_URL}/en-us/news/tags/patch-notes/`;
const scriptId = '🛠️  getLatestPatchNote';

/**
 * Main function to run the script.
 */
export const getLatestPatchNote = async (): Promise<void> => {
  try {
    // Scrap latest patch notes
    console.log(`[${scriptId}] [Scraping] Fetching data for patch notes...`);
    const patchNotes = await scrapLatestPatchNotes(PATCH_TAG_URL);

    if (!patchNotes) {
      console.error('No patch notes found');
      return;
    }

    // ------------------------------------------------------------

    // Summarize patch notes
    console.log(`[${scriptId}] [Summarizing] Summarizing patch notes...`);
    const { textOnly } = patchNotes;
    const summary = await summarizePatchHandler(textOnly);

    // ------------------------------------------------------------

    // Save patch notes to database
    console.log(`[${scriptId}] [Saving] Saving patch notes to database...`);
    await saveNewPatch(summary, patchNotes.patchVersion, patchNotes.publishedDate);

    // ------------------------------------------------------------

    console.log(`[${scriptId}] Successfully retrieved data for patch notes`);
  } catch (error) {
    console.error(`[${scriptId}] Failed to process patch notes:`, error);
    process.exit(1);
  }
};

export default getLatestPatchNote;

/**
 * Run the script `pnpm script:run getLatestPatchNote`
 *
 * This script fetches patch notes from the League of
 * Legends website and save it to the database.
 */
