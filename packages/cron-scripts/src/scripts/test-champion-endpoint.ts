/**
 * Test script for the champion getById endpoint. This
 * script demonstrates how to use the API from a cron
 * script.
 */

import { type AppRouter } from '@lol-assistant/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

type TestChampionOptions = {
  championId?: string;
};

/**
 * Test the champion endpoint by fetching a champion by ID.
 *
 * @param options Configuration options with championId.
 * @returns Object with status and result.
 */
export default async function testChampionEndpoint(
  options: TestChampionOptions = {},
): Promise<{ status: string; result: any }> {
  // Get championId from options or use a default
  const championId = options.championId ?? '862edc50-5e27-486b-92d9-13387f8f7d4b';

  console.log(`[TEST CHAMPION] Testing champion endpoint with ID: ${championId}`);

  try {
    // Create a TRPC client to connect to the API
    const client = createTRPCProxyClient<AppRouter>({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: process.env.API_URL ?? 'http://localhost:4000/api/trpc',
        }),
      ],
    });

    // Call the getById endpoint
    console.log(`[TEST CHAMPION] Calling champion.getById endpoint...`);
    const champion = await client.champion.getById.query({ id: championId });

    console.log(`[TEST CHAMPION] Successfully retrieved champion:`, champion);

    return {
      status: 'success',
      result: champion,
    };
  } catch (error) {
    console.error(`[TEST CHAMPION] Error fetching champion:`, error);

    return {
      status: 'error',
      result: error instanceof Error ? error.message : String(error),
    };
  }
}

// This allows the script to be run directly
if (process.argv[1] === import.meta.url) {
  testChampionEndpoint()
    .then((result) => console.log(result))
    .catch((err) => console.error('Error running script:', err));
}
