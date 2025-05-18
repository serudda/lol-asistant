import { DATA_DRAGON_BASE_URL } from '../../../common/constants/ddragon';
import { normalizeStringToSlug } from '../../../utils/helpers';
import type { ChampionSaveInput, DDragonChampionData, DDragonSpell } from './types';

/**
 * Parse and structure relevant stats from raw champion
 * data.
 *
 * @param championData - Raw champion data for a single
 *   champion from the API.
 * @returns Structured champion stats object ready for DB
 *   insertion/update.
 */
export const parseChampionRawData = (championData: DDragonChampionData, patchVersion: string): ChampionSaveInput => {
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
    const spells = champion.spells.map((spell: DDragonSpell) => ({
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
      slug: normalizeStringToSlug(basicInfo.id), // Use the champion ID as the unique slug
      name: basicInfo.name,
      imageUrl: `${DATA_DRAGON_BASE_URL}/${patchVersion}/img/champion/${basicInfo.image}`, // Construct full image URL
      stats: stats,
      spells: spells,
      passive: passive,
      lastPatchVersion: patchVersion,
    };
  } catch (error) {
    console.error(`[updateChampionStats] Error parsing data for ${champion.id}:`, error);
    // Return null or throw error based on desired handling in the main loop
    throw new Error(`Failed to parse data for ${champion.id}`);
  }
};
