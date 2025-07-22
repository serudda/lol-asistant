import { createClient } from '../utils/trpc-client';
import type { LoLChampionRole, RankTier } from '@prisma/client';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

// Job payload type
export interface ChampionScrapeJob {
  championSlug: string;
  patchVersion: string;
  roles: LoLChampionRole[];
  tiers: RankTier[];
  allowUpdate: boolean;
}

const QUEUE_NAME = 'champion-scrape';

export const enqueueChampionScrapeCore = async ({ allowUpdate }: { allowUpdate: boolean }) => {
  // ------------------------------------------------------------

  // 1. Connect to Redis
  const redis = new Redis({ maxRetriesPerRequest: null });
  const queue = new Queue<ChampionScrapeJob>(QUEUE_NAME, { connection: redis });

  // ------------------------------------------------------------

  // 2. Fetch champions from DB
  const client = createClient();
  const championsResp = await client.champion.getAllBasic.query({});
  const champions = championsResp.result?.champions ?? [];
  if (!champions.length) {
    console.log('[enqueue] No champions found in DB');
    return;
  }

  // ------------------------------------------------------------

  // 3. Enqueue jobs for each champion
  const DEFAULT_TIERS: RankTier[] = ['silver'];

  for (const champ of champions) {
    if (!champ.slug || !champ.lastPatchVersion || !champ.mainRoles?.length) continue;
    const job: ChampionScrapeJob = {
      championSlug: champ.slug,
      patchVersion: champ.lastPatchVersion,
      roles: champ.mainRoles,
      tiers: DEFAULT_TIERS,
      allowUpdate,
    };
    await queue.add('scrape', job);
    console.log(
      `[enqueue] Enqueued job for ${champ.slug} (${champ.mainRoles.join(', ')}) for ${champ.lastPatchVersion}`,
    );
  }

  // ------------------------------------------------------------

  // 4. Close queue and disconnect from Redis
  await queue.close();
  redis.disconnect();
  console.log(`[enqueue] All jobs enqueued! Total: ${champions.length}`);

  // ------------------------------------------------------------
};

/**
 * The entry point for this script is in
 * `src/scripts/enqueueChampionScrape.entry.ts`
 */
