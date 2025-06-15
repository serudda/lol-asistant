import { Sources, SourceUrls } from './constants';
import axios from 'axios';

/**
 * Fetches the list of all champion slugs from Data Dragon
 * for a specific version.
 *
 * @param patchVersion - The game version to fetch champions
 *   for.
 * @returns Array of champion slugs.
 * @throws Error if the request fails or the response is
 *   invalid.
 */
export const getChampionSlugList = async (patchVersion: string): Promise<Array<string>> => {
  const url = `${SourceUrls[Sources.DATA_DRAGON]}/cdn/${patchVersion}/data/en_US/champion.json`;

  try {
    const response = await axios.get(url);
    const championData = response.data.data;

    // Extract slugs (IDs) from the champion data
    const slugs = Object.keys(championData as Record<string, any>);

    return slugs;
  } catch (error) {
    console.error('[Getting] - Error fetching champion slugs:', error);
    throw error;
  }
};
