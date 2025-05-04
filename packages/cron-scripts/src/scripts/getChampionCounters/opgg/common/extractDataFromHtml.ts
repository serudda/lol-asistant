import type { SourceCounter } from '../../common/types';
import type { OPGGRank, OPGGRole } from './constants';
import { opggChampCounterDto } from './dtos';
import * as cheerio from 'cheerio';

/**
 * Extracts champion counter data from an OP.GG HTML page.
 *
 * The HTML structure contains a list of champions in
 * an.<aside> tag. Each champion is represented by an <li>
 * element with:
 *
 * - Champion name in a span with class "text-gray-900"
 * - Win rate in a strong tag with class "text-gray-500"
 * - Number of games in a span with class "text-gray-600"
 *
 * @param html - The HTML content of the page.
 * @param baseUrl - Base URL for constructing champion
 *   links.
 * @returns Array of champion counter data.
 */
export const extractDataFromHtml = (html: string, role: OPGGRole, rank: OPGGRank): Array<SourceCounter> => {
  const $ = cheerio.load(html);

  // Find the aside section containing the counters
  const aside = $('aside.hidden.md\\:block');
  if (aside.length === 0) {
    throw new Error('[extractFromHtml] Could not find the counters section in the HTML');
  }

  // Find all champion list items
  const championItems = aside.find('ul > li');
  const counters: Array<SourceCounter> = [];

  championItems.each((_, element) => {
    const $el = $(element);

    // Extract champion name
    const champion = $el.find('span.text-gray-900').text().trim();
    if (!champion) return; // Skip if no champion name found

    // Extract win rate - try multiple selectors and handle empty cases
    const winRateElement = $el.find('strong.text-xs');
    if (!winRateElement.length) {
      throw new Error(
        `[extractFromHtml] Could not extract winrate for counter '${champion}' in role '${role}'. Element HTML: ${$el.html()}`,
      );
    }
    const counterWinRate = parseInt(winRateElement.text().trim().replace('%', ''));
    if (isNaN(counterWinRate)) {
      throw new Error(
        `[extractFromHtml] Parsed winrate is NaN for counter '${champion}' in role '${role}'. Raw text: '${winRateElement.text()}'`,
      );
    }

    // Extract number of games
    const games = $el.find('span.text-gray-600').last().text().trim();

    counters.push(
      opggChampCounterDto(
        {
          matchupSlug: champion,
          matchupRole: role,
          counterWinRate,
          winRate: 0,
          games: parseInt(games),
        },
        rank,
        0,
      ),
    );
  });

  // Sort and assign ranks in one step
  /* TODO: Review if we need to sort the counters
  return counters
    .sort((a, b) => parseFloat(b.counterWinRate) - parseFloat(a.counterWinRate))
    .map((counter, index) => ({
      ...counter,
      rank: index + 1,
    }));
  */
  return counters;
};
