import { createClient } from '../utils/trpc-client';

type ChampionOptions = {
  championId?: string;
};

const scriptId = 'getChampionById';

/**
 * Fetching a champion by ID.
 *
 * @param options Configuration options with championId.
 * @returns Object with status and result.
 */
const getChampionById = async (options: ChampionOptions = {}): Promise<{ status: string; result: any }> => {
  // Get championId from options or use a default
  const championId = options.championId ?? '862edc50-5e27-486b-92d9-13387f8f7d4b';

  console.log(`[${scriptId}] Testing champion endpoint with ID: ${championId}`);

  try {
    // Use the centralized TRPC client
    const client = createClient();

    // Call the getById endpoint
    console.log(`[${scriptId}] Calling champion.getById endpoint...`);
    const champion = await client.champion.getById.query({ id: championId });

    console.log(`[${scriptId}] Successfully retrieved champion:`, champion);

    return {
      status: 'success',
      result: champion,
    };
  } catch (error) {
    console.error(`[${scriptId}] Error fetching champion:`, error);

    return {
      status: 'error',
      result: error instanceof Error ? error.message : String(error),
    };
  }
};

export default getChampionById;

/*
  Run the script
  `pnpm script:run getChampionById championId="862edc50-5e27-486b-92d9-13387f8f7d4b"`
 
  This script gets a champion by ID.
 */
