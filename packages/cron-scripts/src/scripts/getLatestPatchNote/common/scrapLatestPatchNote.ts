import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://www.leagueoflegends.com';

/**
 * Scrap latest patch notes.
 *
 * @returns Patch notes data object.
 */
export const scrapLatestPatchNotes = async (
  url: string,
): Promise<{ url: string; textOnly: string; patchVersion: string } | undefined> => {
  try {
    const { data: listHTML } = await axios.get(url);
    const $ = cheerio.load(listHTML as string);

    console.log(`[Scraping] Fetching data from: ${url}`);

    const firstPatchURL = $('[data-testid="articlefeaturedcard-component"]').first().attr('href');

    if (!firstPatchURL) throw new Error('It was not possible to get the latest patch note');

    const fullPatchURL = `${BASE_URL}${firstPatchURL}`;
    console.log(`[Scraping] Latest patch: ${fullPatchURL}`);

    // Extract patch version from URL
    const patchVersion = /patch-(\d+-\d+)/.exec(fullPatchURL)?.[1] ?? 'unknown';
    console.log(`[Scraping] Patch version: ${patchVersion}`);

    const { data: patchHTML } = await axios.get(fullPatchURL);
    const $$ = cheerio.load(patchHTML as string);

    // Extract the main content
    const patchContent = $$('#patch-notes-container');

    if (!patchContent.length) {
      console.error('We were not able to find #patch-notes-container 😢');
      return;
    }

    const textOnly = patchContent.text().trim();

    // Replace 4 or more newlines with divider and remove tabs
    const formattedText = textOnly
      .replace(/\t/g, '') // Remove all tabs
      .replace(/\n\s*\n\s*\n\s*\n+/g, '\n-----\n'); // Replace 4+ newlines with divider

    console.log('[Scraping] Successfully formatted text');

    return {
      url: fullPatchURL,
      textOnly: formattedText,
      patchVersion,
    };
  } catch (error) {
    console.error(`Error fetching patch notes:`, error);
    throw error;
  }
};
