import type { RankTier } from '@lol-assistant/db';
import { getMainRolesByChampion } from './getMainRoles/getMainRolesByChampion';

const scriptId = '🛠️  getMainRoles';

// This is the minimum popularity percentage to be considered a main role
const THRESHOLD = 2.0;

interface GetMainRolesArgs {
  champion: string;
  tier: RankTier;
}

export const getMainRoles = async ({ champion, tier }: GetMainRolesArgs): Promise<void> => {
  try {
    // Scrape main roles for all champions from League of Graphs
    console.log(`[${scriptId}] [Scraping] Fetching main roles for all champions...`);
    const mainRolesData = await getMainRolesByChampion(champion, tier);

    // Check if mainRolesData is empty
    if (mainRolesData.length === 0) {
      console.error(`[${scriptId}] [Error] No main roles data found for ${champion} (threshold: ${THRESHOLD}%)`);
      return;
    }

    // ------------------------------------------------------------

    // Process and decide main roles per champion
    console.log(`[${scriptId}] [Processing] Deciding main roles for each champion...`);
    const mainRoles = mainRolesData.filter((r) => r.popularity >= THRESHOLD).map((r) => r.role);

    if (mainRoles.length === 0) {
      console.error(`[${scriptId}] [Error] No main roles found for ${champion} (threshold: ${THRESHOLD}%)`);
      return;
    }

    console.log(`[${scriptId}] Main roles for ${champion}:`, mainRoles);

    // ------------------------------------------------------------

    // 3. Save main roles to database
    console.log(`[${scriptId}] [Saving] Updating mainRoles in database...`);
    // TODO: Implement DB update logic (saveMainRoles on api folder)

    console.log(`[${scriptId}] Successfully populated mainRoles for all champions.`);
  } catch (error) {
    console.error(`[${scriptId}] Failed to populate mainRoles:`, error);
    process.exit(1);
  }
};

export default getMainRoles;

/**
 * Run the script `pnpm script:run getMainRoles`
 *
 * This script fetches main roles for all champions from
 * League of Graphs and save it to the database.
 */
