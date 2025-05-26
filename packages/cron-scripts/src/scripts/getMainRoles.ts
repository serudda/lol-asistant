import type { RankTier } from '@lol-assistant/db';
import { saveMainRoles } from './getMainRoles/api/saveMainRoles';
import { getChampionSlugForSource, normalizeChampionSlugFromSource, Sources } from './getMainRoles/common/constants';
import { getMainRolesByChampion } from './getMainRoles/getMainRolesByChampion';

const scriptId = '🛠️  getMainRoles';

// This is the minimum popularity percentage to be considered a main role
const THRESHOLD = 2.0;

interface GetMainRolesArgs {
  champion: string;
  tier: RankTier;
}

/**
 * Get main roles for a champion from League of Graphs.
 *
 * @param champion - The champion to get main roles for.
 * @param tier - The tier of the champion.
 * @returns A promise that resolves to void.
 */
export const getMainRoles = async ({ champion, tier }: GetMainRolesArgs): Promise<void> => {
  try {
    // Scrape main roles for all champions from League of Graphs
    console.log(`[${scriptId}] [Scraping] Fetching main roles for all champions...`);
    const leagueOfGraphsChampionSlug = getChampionSlugForSource(champion, Sources.LEAGUE_OF_GRAPHS);
    const mainRolesData = await getMainRolesByChampion(leagueOfGraphsChampionSlug, tier);

    // Check if mainRolesData is empty
    if (mainRolesData.length === 0) {
      console.error(
        `[${scriptId}] [Error] No main roles data found for ${leagueOfGraphsChampionSlug} (threshold: ${THRESHOLD}%)`,
      );
      return;
    }

    // ------------------------------------------------------------

    // Process and decide main roles per champion
    console.log(`[${scriptId}] [Processing] Deciding main roles for each champion...`);
    const mainRoles = mainRolesData.filter((r) => r.popularity >= THRESHOLD).map((r) => r.role);

    if (mainRoles.length === 0) {
      console.error(
        `[${scriptId}] [Error] No main roles found for ${leagueOfGraphsChampionSlug} (threshold: ${THRESHOLD}%)`,
      );
      return;
    }

    console.log(`[${scriptId}] Main roles for ${leagueOfGraphsChampionSlug}:`, mainRoles);

    // ------------------------------------------------------------

    // Save main roles to database
    console.log(`[${scriptId}] [Saving] Updating mainRoles in database...`);
    const response = await saveMainRoles({
      championSlug: normalizeChampionSlugFromSource(leagueOfGraphsChampionSlug, Sources.LEAGUE_OF_GRAPHS),
      mainRoles,
    });

    // Check if the update was successful
    if (!response.id) {
      console.error(`[${scriptId}] [Error] Failed to update mainRoles for champion ${leagueOfGraphsChampionSlug}.`);
      return;
    }

    console.log(`[${scriptId}] Successfully populated mainRoles for champion ${leagueOfGraphsChampionSlug}.`);
    process.exit(0);
  } catch (error) {
    console.error(`[${scriptId}] Failed to populate mainRoles:`, error);
    process.exit(1);
  }
};

export default getMainRoles;

/**
 * Run the script `pnpm script:run getMainRoles
 * champion=Aatrox tier=silver`
 *
 * This script fetches main roles for all champions from
 * League of Graphs and save it to the database.
 */
