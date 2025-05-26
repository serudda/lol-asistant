import type { RankTier } from '@lol-assistant/db';
import { createClient } from '../utils/trpc-client';
import getMainRoles from './getMainRoles';

const scriptId = '🛠️  getMainRolesBatch';
const BATCH_SIZE = 3;
const DELAY_MS = 2000;

interface GetMainRolesBatchArgs {
  tier: RankTier;
}

/**
 * Batch script to populate mainRoles for all champions in
 * the DB.
 */
export const getMainRolesBatch = async ({ tier }: GetMainRolesBatchArgs): Promise<void> => {
  try {
    console.log(`[${scriptId}] [Init] Fetching all champions from DB...`);
    const client = createClient();

    // ------------------------------------------------------------

    // Get all champions from DB
    console.log(`[${scriptId}] [Fetching] Fetching all champions from DB...`);
    const championsResp = await client.champion.getAllBasic.query({});
    const champions = championsResp.result?.champions;

    // Check if there are champions in the DB
    if (!champions || champions.length === 0) {
      console.error(`[${scriptId}] [Error] No champions found in DB.`);
      process.exit(1);
    }

    console.log(`[${scriptId}] [Fetched] Fetched ${champions?.length} champions from DB.`);

    // ------------------------------------------------------------

    // Process champions in batches
    console.log(`[${scriptId}] [Batch] Processing ${champions.length} champions...`);

    for (let i = 0; i < champions.length; i += BATCH_SIZE) {
      const batch = champions.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (champion) => {
          const ok = await getMainRoles({ champion: champion.slug, tier });
          if (ok) {
            console.log(`[${scriptId}] [Batch] Success for ${champion.slug}`);
          } else {
            console.error(`[${scriptId}] [Batch] Fail for ${champion.slug}`);
          }
          return ok;
        }),
      );
      if (i + BATCH_SIZE < champions.length) {
        console.log(`[${scriptId}] [Batch] Waiting ${DELAY_MS}ms before next batch...`);
        await new Promise((res) => setTimeout(res, DELAY_MS));
      }
    }
    console.log(`[${scriptId}] [Done] All champions processed.`);
    process.exit(0);
  } catch (error) {
    console.error(`[${scriptId}] [Fatal] Failed to populate mainRoles for all champions:`, error);
    process.exit(1);
  }
};

export default getMainRolesBatch;

/**
 * Run the script: `pnpm script:run getMainRolesBatch
 * tier=silver`
 *
 * This script fetches main roles for all champions from
 * League of Graphs and saves them to the database.
 */
