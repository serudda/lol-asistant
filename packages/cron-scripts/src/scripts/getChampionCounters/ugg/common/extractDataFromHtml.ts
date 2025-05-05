import type { SourceCounter } from '../../common/types';
import type { UGGRank, UGGRole } from './constants';
import { uggChampCounterDto } from './dtos';
import * as cheerio from 'cheerio';

/**
 * Extracts counter champions list from U.GG HTML content by
 * finding the "Best Picks vs" section.
 *
 * @param html - The HTML content to parse.
 * @param role - The role being processed (used as default
 *   if not found per champion)
 * @param rank - The rank being processed (used as default
 *   if not found per champion)
 * @returns Array of champion counter data.
 */
export const extractDataFromHtml = (html: string, role: UGGRole, rank: UGGRank): Array<SourceCounter> => {
  const $ = cheerio.load(html);
  const counters: Array<SourceCounter> = [];

  // Find the section containing "Best Picks vs"
  const bestPicksSection = $('div:contains("Best Picks vs")').closest('div.rounded-\\[3px\\].overflow-hidden');

  if (bestPicksSection.length === 0) {
    console.error('[extractDataFromHtml - U.GG] Could not find the "Best Picks vs" section in the HTML.');
    throw new Error('Could not find champion list container in U.GG HTML.');
  }

  // Find all champion rows (links) within the best picks section
  const championRows = bestPicksSection.find('a[href*="/lol/champions/"]');

  console.log(`[extractDataFromHtml - U.GG] Found ${championRows.length} potential champion rows.`);

  championRows.each((i, row) => {
    const $row = $(row);
    try {
      // Extract champion slug
      const championLinkRelative = $row.attr('href') ?? ''; // e.g. lol/champions/drmundo/build
      const championSlug = championLinkRelative.split('/')[3] ?? ''; // e.g. drmundo
      console.log(`[extractDataFromHtml - U.GG] Champion slug: ${championSlug}`);

      // Extract champion name
      const champion = $row.find('.text-white.text-\\[14px\\].font-bold.truncate').text().trim();
      if (!champion) {
        console.warn(`[extractDataFromHtml - U.GG] Skipping row ${i + 1}: Could not find champion name.`);
        return;
      }

      // Extract win rate
      const wrText = $row.find('div > div.text-\\[12px\\].font-bold').first().text().trim();
      const wrMatch = /([\d.]+)%/.exec(wrText);
      const counterWinRate = wrMatch ? `${wrMatch[1]}%` : 'N/A';

      // Extract number of matches
      const matchesText = $row.find('div > div.text-accent-gray-100.text-\\[11px\\]').text().trim();
      const matchesRaw = matchesText.replace(/[, games]/g, '');
      const matches = parseInt(matchesRaw, 10);
      if (isNaN(matches)) {
        console.warn(
          `[extractDataFromHtml - U.GG] Skipping row ${i + 1} (${champion}): Could not parse matches "${matchesText}" as a number.`,
        );
        return;
      }

      counters.push(
        uggChampCounterDto(
          {
            champion: championSlug,
            role,
            counterWinRate,
            matches,
          },
          rank,
          i + 1,
        ),
      );
    } catch (error) {
      console.error(`[extractDataFromHtml - U.GG] Error processing U.GG row ${i + 1}:`, error);
      console.error(`[extractDataFromHtml - U.GG] Row HTML: ${$row.html()}`);
    }
  });

  if (counters.length === 0) {
    console.warn(
      '[extractDataFromHtml - U.GG] Extraction finished, but no counter data was successfully parsed. Check selectors and HTML structure.',
    );
  } else {
    console.log(`[extractDataFromHtml - U.GG] Successfully extracted data for ${counters.length} champions.`);
  }

  return counters;
};
