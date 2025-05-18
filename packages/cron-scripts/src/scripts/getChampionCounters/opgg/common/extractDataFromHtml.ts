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
  // Find the first <aside> with <ul><li> children (robust to class changes)
  const aside = $('aside')
    .filter((_, el) => $(el).find('ul > li').length > 0)
    .first();
  if (aside.length === 0) throw new Error('[extractFromHtml] No counters section found');

  const counters: Array<SourceCounter> = [];
  aside.find('ul > li').each((_, el) => {
    const $el = $(el);
    const spans = $el.find('span');
    const strongs = $el.find('strong');
    const champion = spans.first().text().trim();
    if (!champion) {
      // Log for debugging if structure changes
      console.warn('[extractFromHtml] No champion name found in <li>:', $el.html());
      return;
    }
    const counterWinRate = strongs.first().text().replace('%', '').trim();
    const gamesRaw = spans.last().text().trim();
    const games = gamesRaw.includes(',') ? Number(gamesRaw.replace(/,/g, '')) : Number(gamesRaw);

    counters.push(
      opggChampCounterDto(
        {
          matchupSlug: champion,
          matchupRole: role,
          counterWinRate,
          games,
        },
        rank,
        0,
      ),
    );
  });

  return counters
    .sort((a, b) => b.counterWinRate - a.counterWinRate)
    .map((counter, index) => ({
      ...counter,
      rank: index + 1,
    }));
};
