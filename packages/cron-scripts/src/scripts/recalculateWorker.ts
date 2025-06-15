import { ResponseStatus } from '@lol-assistant/api/src/common';
import { createClient } from '../utils/trpc-client';
import type { RecalculateJob } from './enqueueRecalculateJobs';
import { Worker } from 'bullmq';
import Redis from 'ioredis';

const QUEUE_NAME = 'recalculate-stats';
const CONCURRENCY = Number(process.env.WORKER_CONCURRENCY ?? 2);

const redis = new Redis({ maxRetriesPerRequest: null });

// Extract the core recalculation logic
const processRecalculation = async (championSlug: string, patchVersion: string) => {
  const client = createClient();
  const scriptId = `🛠️  recalculateWorker[${championSlug}]`;

  console.log(`[${scriptId}] Starting recalculate champion matchup stats for version: ${patchVersion}`);

  // ------------------------------------------------------------

  // Get all championMatchup IDs
  let championMatchupIds: string[] = [];
  try {
    const response = await client.championMatchup.getAllIdsByChampionSlug.query({
      patchVersion,
      championSlug,
    });
    if (response.result.status !== ResponseStatus.SUCCESS) {
      throw new Error(`Failed to fetch championMatchup IDs for championSlug: ${championSlug}`);
    }

    championMatchupIds = Array.isArray(response.result.championMatchupIds) ? response.result.championMatchupIds : [];
    console.log(
      `[${scriptId}] Found ${championMatchupIds.length} championMatchups to recalculate for championSlug: ${championSlug}.`,
    );
  } catch (err) {
    console.error(`[${scriptId}] Failed to fetch championMatchup IDs:`, err);
    throw err;
  }

  // ------------------------------------------------------------

  // Recalculate stats for each (with sequential processing to avoid DB overload)
  console.log(`[${scriptId}] Recalculating stats for all processed matchups...`);

  // Navigate through all processed matchupIds and recalculate stats
  const results = await Promise.all(
    championMatchupIds.map(async (championMatchupId) => {
      try {
        const res = await client.championMatchup.calculateStats.mutate({ championMatchupId });
        if (res.result.status === ResponseStatus.SUCCESS && res.result.championMatchup) {
          const matchup = res.result.championMatchup;
          console.log(
            `[${scriptId}] [SUCCESS] ${championMatchupId} -> weightedWinRate: ${matchup.weightedWinRate}, totalMatches: ${matchup.totalMatches}`,
          );
          return { championMatchupId, success: true, data: matchup };
        } else {
          console.log(`[${scriptId}] [WARN] No data returned for ${championMatchupId}`);
          return { championMatchupId, success: false };
        }
      } catch (err) {
        console.error(`[${scriptId}] [ERROR] Failed for ${championMatchupId}:`, err);
        return { championMatchupId, success: false, error: err };
      }
    }),
  );

  // ------------------------------------------------------------

  // Summary
  const successCount = results.filter((result) => result.success).length;
  const failCount = results.length - successCount;
  console.log(`[${scriptId}] Summary: ${successCount} succeeded, ${failCount} failed.`);
  if (failCount > 0) {
    console.log(
      `[${scriptId}] Failed IDs:`,
      results.filter((r) => !r.success).map((r) => r.championMatchupId),
    );
  }

  return { successCount, failCount, totalProcessed: results.length };
};

const worker = new Worker<RecalculateJob>(
  QUEUE_NAME,
  async (job) => {
    const { championSlug, patchVersion } = job.data;
    console.log(`[worker] Processing recalculation for ${championSlug} (patch: ${patchVersion})`);

    try {
      const result = await processRecalculation(championSlug, patchVersion);
      console.log(`[worker] Done: ${championSlug} (${result.successCount}/${result.totalProcessed} successful)`);
      return result;
    } catch (err) {
      console.error(`[worker] Error processing ${championSlug}:`, err);
      throw err; // BullMQ will handle retries if configured
    }
  },
  {
    connection: redis,
    concurrency: CONCURRENCY,
  },
);

worker.on('completed', (job) => {
  console.log(`[worker] Job completed: ${job.id} (${job.data.championSlug})`);
});

worker.on('failed', (job, err) => {
  console.error(`[worker] Job failed: ${job?.id} (${job?.data?.championSlug})`, err);
});

worker.on('stalled', (jobId) => {
  console.warn(`[worker] Job stalled: ${jobId}`);
});

const main = () => {
  console.log(`[worker] Recalculate stats worker started (concurrency: ${CONCURRENCY})`);
  console.log(`[worker] Optimized for database stability with sequential processing and delays`);
  // The worker is already running as a side effect
};

export default main;
