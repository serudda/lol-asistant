import { U_GG_CHAMPION_URL, type UGGRank, type UGGRole } from '../../../common';
import { getHtmlFromPage } from '../../../utils/getHtmlFromPage';
import type { SourceCounter } from '../common/types';
import { extractDataFromHtml } from './common/extractDataFromHtml';

/**
 * Get champion data from U.GG HTML page for a specific
 * champion and version.
 *
 * @param slug - The slug of the champion. e.g. 'ahri'
 * @param role - The role of the champion. e.g. 'mid'
 * @param rank - The rank of the champion. e.g. 'iron'
 */
export const getUGGCounters = async (slug: string, role: UGGRole, rank: UGGRank): Promise<Array<SourceCounter>> => {
  try {
    // Fetch all raw counters from U.GG HTML page by web scraping
    console.log(`[getUGGCounters] Web scraping counters for: ${slug} (${role}, ${rank})`);
    const url = `${U_GG_CHAMPION_URL}/${slug}/counter?role=${role}&rank=${rank}`;
    const html = await getHtmlFromPage(url);

    // Extract counters from HTML
    const counters = extractDataFromHtml(html, role, rank);
    console.log(`[getUGGCounters] Extracted ${counters.length} counters.`);

    return counters;
  } catch (error) {
    console.error(`[getUGGCounters] Failed to fetch or parse counters:`, error);
    throw error;
  }
};
