import type { InternalRank, InternalRole } from './getChampionCounters/common/constants';
import {
  Sources,
  toMobalyticsRank,
  toMobalyticsRole,
  toOPGGRank,
  toOPGGRole,
  toUGGRank,
  toUGGRole,
} from './getChampionCounters/common/constants';
import { saveSourceMatchupStats } from './getChampionCounters/common/saveSourceMatchupStats';
import { getMobalyticsCounters } from './getChampionCounters/mobalytics/getMobalyticsCounters';
import { getOPGGCounters } from './getChampionCounters/opgg/getOPGGCounters';
import { getUGGCounters } from './getChampionCounters/ugg/getUGGCounters';

const scriptId = '🛠️  getChampionCounters';

interface GetChampionCountersArgs {
  patchVersion: string;
  championSlug: string;
  role: InternalRole;
  rank: InternalRank;
}

/**
 * Main function to get champion counters for a specific
 * patch version.
 */
export const getChampionCounters = async ({
  patchVersion,
  championSlug,
  role,
  rank,
}: GetChampionCountersArgs): Promise<void> => {
  console.log(`[${scriptId}] Starting get champion counters for version: ${patchVersion}`);

  try {
    // Get Mobalytics counters
    const mobalyticsRole = toMobalyticsRole(role);
    const mobalyticsRank = toMobalyticsRank(rank);
    console.log(`[${scriptId}] [Fetching Mobalytics] Fetching data for champion: ${championSlug}`);
    const mobalyticsData = await getMobalyticsCounters(championSlug, mobalyticsRole, mobalyticsRank);
    console.log('** Mobalytics Data **', mobalyticsData);

    // ------------------------------------------------------------

    // Get OP.GG counters
    const opggRole = toOPGGRole(role);
    const opggRank = toOPGGRank(rank);
    console.log(`[${scriptId}] [Fetching OP.GG] Fetching data for champion: ${championSlug}`);
    const opggData = await getOPGGCounters(championSlug, opggRole, opggRank);
    await saveSourceMatchupStats({
      counters: opggData,
      championMatchupId: '8c9c4bba-66d6-4e07-ac28-9a3f32cbc81f',
      sourceSlug: Sources.OP_GG,
      scrapedAt: new Date().toISOString(),
    });

    // ------------------------------------------------------------

    // Get U.GG counters
    const uggRole = toUGGRole(role);
    const uggRank = toUGGRank(rank);
    console.log(`[${scriptId}] [Fetching U.GG] Fetching data for champion: ${championSlug}`);
    const uggData = await getUGGCounters(championSlug, uggRole, uggRank);
    console.log('** U.GG Data **', uggData);

    // ------------------------------------------------------------

    // TODO: Consolidate and parse all data to a single object to save it in the database

    // ------------------------------------------------------------

    // Save champion data to database
    // console.log(`[${scriptId}] [Saving Champion Data] Saving stats for ${championSlug}`);
    // await saveChampion(parsedChampion, patchVersion);

    // ------------------------------------------------------------

    console.log(`[${scriptId}] Successfully processed stats for ${championSlug}`);
  } catch (error) {
    // Error handling will be refined in later tasks to allow continuation
    console.error(`[${scriptId}] Failed to process champion ${championSlug}:`, error);
    // For now, exit on first error during refactoring stage
    process.exit(1);
  }

  console.log(`[${scriptId}] Finished update process for version: ${patchVersion}`);
};
export default getChampionCounters;

/*
  Run the script `pnpm script:run getChampionCounters patchVersion=<game_version> championSlug=<champion_slug> role=<role> rank=<rank>`
 
  Example: `pnpm script:run getChampionCounters patchVersion=14.1.1 championSlug=ahri role=mid rank=platinum`
 
  This script fetches champion data from the League of
  Legends Data Dragon API for a specific version, processes
  it, and saves/updates it in the database.
 */
