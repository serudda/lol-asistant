import type { RankTier } from '@lol-assistant/db';
import { getHtmlFromPage } from '../../utils/getHtmlFromPage';
import type { MainRole } from './common/extractDataFromHtml';
import { extractDataFromHtml } from './common/extractDataFromHtml';

const BASE_URL = 'https://www.leagueofgraphs.com';

/**
 * Get champion main roles from League of Graphs HTML page
 * for a specific champion and rank.
 *
 * @param slug - The slug of the champion. e.g. 'ahri'
 * @param rank - The rank of the champion. e.g. 'silver'
 * @returns Array of main roles for the champion.
 */
export const getMainRolesByChampion = async (slug: string, rank: RankTier): Promise<Array<MainRole>> => {
  try {
    // Fetch all raw main roles from League of Graphs HTML page by web scraping
    console.log(`[getMainRolesByChampion] Web scraping main roles for: ${slug} (${rank})`);
    const url = `${BASE_URL}/champions/stats/${slug}/${rank}`;
    const headers = {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.leagueofgraphs.com/',
    };
    const html = await getHtmlFromPage(url, headers);

    // Extract main roles from HTML
    const mainRoles = extractDataFromHtml(html);
    console.log(`[getMainRolesByChampion] Extracted ${mainRoles.length} main roles.`);

    return mainRoles;
  } catch (error) {
    console.error(`[getMainRolesByChampion] Failed to fetch or parse main roles:`, error);
    throw error;
  }
};
