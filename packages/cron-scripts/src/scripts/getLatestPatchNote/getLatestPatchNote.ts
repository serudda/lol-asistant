import { summarizePatchHandler } from './ai/summarizePatch/handler';
import { saveNewPatch } from './api/saveNewPatch';
import { scrapLatestPatchNotes } from './common/scrapLatestPatchNote';

// Configuration constants
const BASE_URL = 'https://www.leagueoflegends.com';
const PATCH_TAG_URL = `${BASE_URL}/en-us/news/tags/patch-notes/`;

/**
 * Main function to run the script.
 */
export const getLatestPatchNote = async (): Promise<void> => {
  try {
    console.log(`--- Starting to get latest patch notes ---`);

    // ------------------------------------------------------------

    // Scrap latest patch notes
    console.log(`[Scraping] Fetching data for patch notes...`);
    const patchNotes = await scrapLatestPatchNotes(PATCH_TAG_URL);

    if (!patchNotes) {
      console.error('No patch notes found');
      return;
    }

    // ------------------------------------------------------------

    // Summarize patch notes
    console.log(`[Summarizing] Summarizing patch notes...`);
    const { textOnly } = patchNotes;
    const summary = await summarizePatchHandler(textOnly);

    // ------------------------------------------------------------

    // Save patch notes to database
    console.log(`[Saving] Saving patch notes to database...`);
    await saveNewPatch(summary, patchNotes.patchVersion, new Date());

    // ------------------------------------------------------------

    console.log(`Successfully retrieved data for patch notes`);
  } catch (error) {
    console.error('Failed to process patch notes:', error);
    process.exit(1);
  }
};

export default getLatestPatchNote;

/**
 * Run the script `pnpm start
 * /leagueOfLegends/getLatestPatchNote/getLatestPatchNote.run`
 *
 * This script fetches patch notes from the League of
 * Legends website and save it to the database.
 */
