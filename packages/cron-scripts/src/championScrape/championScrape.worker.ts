import type { ChampionScrapeJob } from './enqueueChampionScrape.core';
import orchestrateMatchupStats from './orchestrateMatchupStats';
import { Worker } from 'bullmq';
import Redis from 'ioredis';

const QUEUE_NAME = 'champion-scrape';
const CONCURRENCY = Number(process.env.WORKER_CONCURRENCY ?? 5);

const redis = new Redis({ maxRetriesPerRequest: null });

const worker = new Worker<ChampionScrapeJob>(
  QUEUE_NAME,
  async (job) => {
    const { championSlug, patchVersion, roles, tiers } = job.data;
    console.log(`[worker] Processing ${championSlug} (roles: ${roles.join(', ')}, patch: ${patchVersion})`);
    try {
      await orchestrateMatchupStats({
        patchVersion,
        champions: championSlug,
        roles: roles.join(','),
        tiers: tiers.join(','),
        allowUpdate: true,
      });
      console.log(`[worker] Done: ${championSlug}`);
    } catch (err) {
      console.error(`[worker] Error processing ${championSlug}:`, err);
      throw err; // BullMQ will handle retries if configured
    }
  },
  { connection: redis, concurrency: CONCURRENCY },
);

worker.on('completed', (job) => {
  console.log(`[worker] Job completed: ${job.id}`);
});
worker.on('failed', (job, err) => {
  console.error(`[worker] Job failed: ${job?.id}`, err);
});

const main = () => {
  console.log(`[worker] Champion scrape worker started (concurrency: ${CONCURRENCY})`);
  // The worker is already running as a side effect
};

export default main;
