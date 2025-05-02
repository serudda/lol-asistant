import { DATA_DRAGON_BASE_URL, LANGUAGE } from './constants';
import type { DDragonChampionData } from './types';
import axios from 'axios';

/**
 * Get champion data from Data Dragon API for a specific
 * champion and version.
 *
 * @param championId - The ID (slug) of the champion.
 * @param patchVersion - The game version (e.g., '14.1.1').
 * @returns Raw champion data object from the API.
 */
export const getChampionData = async (championId: string, patchVersion: string): Promise<DDragonChampionData> => {
  // Changed return type from any to DDragonChampionData
  const url = `${DATA_DRAGON_BASE_URL}/${patchVersion}/data/${LANGUAGE}/champion/${championId}.json`;
  console.log(`[updateChampionStats] Fetching data from: ${url}`);

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
      `[updateChampionStats] Error fetching champion data for ${championId} (version ${patchVersion}):`,
      error instanceof Error ? error.message : error,
    );
    throw error; // Re-throw to be caught by the main loop
  }
};

/**
 * Parse and structure relevant stats from raw champion
 * data.
 *
 * @param championData - Raw champion data for a single
 *   champion from the API.
 * @returns Structured champion stats object ready for DB
 *   insertion/update.
 */
export const parseChampionStats = (championData: any): any => {
  // Note: championData here is already response.data.data[championId]
  const champion = championData;

  try {
    // Reorganize stats into a more structured format
    const stats = {
      hp: { base: champion.stats.hp, perLevel: champion.stats.hpperlevel },
      mp: { base: champion.stats.mp, perLevel: champion.stats.mpperlevel },
      movespeed: champion.stats.movespeed,
      armor: { base: champion.stats.armor, perLevel: champion.stats.armorperlevel },
      spellblock: { base: champion.stats.spellblock, perLevel: champion.stats.spellblockperlevel },
      attackdamage: {
        base: champion.stats.attackdamage,
        perLevel: champion.stats.attackdamageperlevel,
      },
      attackspeed: { base: champion.stats.attackspeed, perLevel: champion.stats.attackspeedperlevel },
      attackrange: champion.stats.attackrange,
      hpregen: { base: champion.stats.hpregen, perLevel: champion.stats.hpregenperlevel },
      mpregen: { base: champion.stats.mpregen, perLevel: champion.stats.mpregenperlevel },
      crit: { base: champion.stats.crit, perLevel: champion.stats.critperlevel }, // Added crit stats if available
    };

    // Extract basic info
    const basicInfo = {
      id: champion.id, // This is the slug (e.g., "Aatrox")
      key: champion.key, // Numerical key (e.g., "266")
      name: champion.name,
      title: champion.title,
      tags: champion.tags, // Roles (e.g., ["Fighter", "Tank"])
      partype: champion.partype, // Resource type (e.g., "Blood Well")
      image: champion.image.full, // Main image filename
    };

    // Extract active abilities (spells) with key data
    const spells = champion.spells.map((spell: any) => ({
      id: spell.id, // e.g., "AatroxQ"
      name: spell.name,
      description: spell.description,
      tooltip: spell.tooltip,
      cooldown: spell.cooldown, // Cooldowns by level
      cost: spell.cost, // Costs by level
      range: spell.range, // Range by level or flat
      image: spell.image.full,
    }));

    // Extract passive ability
    const passive = {
      name: champion.passive.name,
      description: champion.passive.description,
      image: champion.passive.image ? champion.passive.image.full : null,
    };

    // Combine all extracted data suitable for Prisma schema
    // Note: The 'stats', 'spells', 'passive' fields in Prisma are Json type
    return {
      slug: basicInfo.id, // Use the champion ID as the unique slug
      name: basicInfo.name,
      imageUrl: `${DATA_DRAGON_BASE_URL}/img/champion/${basicInfo.image}`, // Construct full image URL
      stats: stats,
      spells: spells,
      passive: passive,
      // Add other fields from Prisma schema as needed (e.g., version if tracking per-version)
      // version: version, // Decided against storing version directly on champion record for now
    };
  } catch (error) {
    console.error(`[updateChampionStats] Error parsing data for ${champion.id}:`, error);
    // Return null or throw error based on desired handling in the main loop
    throw new Error(`Failed to parse data for ${champion.id}`);
  }
};
