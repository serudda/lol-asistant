import { DATA_DRAGON_BASE_URL, LANGUAGE } from './constants';
import type { DDragonChampionData } from './types';
import axios from 'axios';

/**
 * Get champion data from Data Dragon API for a specific
 * champion and version.
 *
 * @param championId - The ID (slug) of the champion.
 * @param patchVersion - The game version (e.g., '14.1.1').
 */
export const getChampionRawData = async (championId: string, patchVersion: string): Promise<DDragonChampionData> => {
  const url = `${DATA_DRAGON_BASE_URL}/${patchVersion}/data/${LANGUAGE}/champion/${championId}.json`;
  console.log(`[getChampionRawData] Fetching data from: ${url}`);

  try {
    const response = await axios.get(url);
    // The actual champion data is nested under data.{championId}
    if (response.data && response.data.data && response.data.data[championId]) {
      // Assuming the API response matches the DDragonChampionData structure
      return response.data.data[championId] as DDragonChampionData;
    } else {
      throw new Error(`Unexpected API response structure for ${championId}`);
    }
  } catch (error) {
    // Log specific error and re-throw or handle as needed
    console.error(
      `[getChampionRawData] Error fetching champion data for ${championId} (version ${patchVersion}):`,
      error instanceof Error ? error.message : error,
    );
    throw error; // Re-throw to be caught by the main loop
  }
};
