import { getLastestPatch } from '../db/getLastestPatch';
import { createClient } from '../utils/trpc-client';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

// Job payload type
export interface RecalculateJob {
  championSlug: string;
  patchVersion: string;
}

const QUEUE_NAME = 'recalculate-stats';

const enqueueRecalculateJobs = async () => {
  // ------------------------------------------------------------

  // 1. Get the latest patch version automatically
  console.log('[enqueue-recalculate] Fetching latest patch version...');
  const latestPatchResp = await getLastestPatch();

  if (!latestPatchResp.result?.patchNote?.patchVersion) {
    console.error('[enqueue-recalculate] Could not fetch latest patch version');
    process.exit(1);
  }

  const patchVersion = latestPatchResp.result.patchNote.patchVersion;
  console.log(`[enqueue-recalculate] Using patch version: ${patchVersion}`);

  // ------------------------------------------------------------

  // 2. Connect to Redis
  const redis = new Redis({ maxRetriesPerRequest: null });
  const queue = new Queue<RecalculateJob>(QUEUE_NAME, { connection: redis });

  // ------------------------------------------------------------

  // 3. Fetch champions from DB
  const client = createClient();
  const championsResp = await client.champion.getAllBasic.query({});
  const champions = championsResp.result?.champions ?? [];
  if (!champions.length) {
    console.log('[enqueue-recalculate] No champions found in DB');
    return;
  }

  // ------------------------------------------------------------

  // 4. Enqueue jobs for each champion
  for (const champ of champions) {
    if (!champ.slug) continue;

    const job: RecalculateJob = {
      championSlug: champ.slug,
      patchVersion,
    };

    await queue.add('recalculate', job);
    console.log(`[enqueue-recalculate] Enqueued job for ${champ.slug} (patch: ${patchVersion})`);
  }

  // ------------------------------------------------------------

  // 5. Close queue and disconnect from Redis
  await queue.close();
  redis.disconnect();
  console.log(
    `[enqueue-recalculate] All jobs enqueued! Total: ${champions.length} champions for patch ${patchVersion}`,
  );

  // ------------------------------------------------------------
};

// Allow running as a script
if (process.argv[1] === import.meta.url) {
  enqueueRecalculateJobs().catch((err) => {
    console.error('[enqueue-recalculate] Fatal error:', err);
    process.exit(1);
  });
}

export default enqueueRecalculateJobs;
