import { getHtmlFromPage } from '../../../utils/getHtmlFromPage';
import type { SourceCounter } from '../common/types';
import type { OPGGRank, OPGGRole } from './common/constants';
import { OPGG_CHAMPION_URL } from './common/constants';
import { extractDataFromHtml } from './common/extractDataFromHtml';

/**
 * Get champion data from OP.GG HTML page for a specific
 * champion and version.
 *
 * @param slug - The slug of the champion. e.g. 'ahri'
 * @param role - The role of the champion. e.g. 'mid'
 * @param rank - The rank of the champion. e.g. 'iron'
 */
export const getOPGGCounters = async (slug: string, role: OPGGRole, rank: OPGGRank): Promise<Array<SourceCounter>> => {
  try {
    // Fetch all raw counters from OP.GG HTML page by web scraping
    console.log(`[getOPGGCounters] Web scraping counters for: ${slug} (${role}, ${rank})`);
    const url = `${OPGG_CHAMPION_URL}/${slug}/counters/${role}?tier=${rank}&region=global`;
    const html = await getHtmlFromPage(url);

    // Extract counters from HTML
    const counters = extractDataFromHtml(html, role, rank);
    console.log(`[getOPGGCounters] Extracted ${counters.length} counters.`);

    return counters;
  } catch (error) {
    console.error(`[getOPGGCounters] Failed to fetch or parse counters:`, error);
    throw error;
  }
};
