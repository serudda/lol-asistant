import { mapWithConcurrency } from '../utils/concurrency';
import { createClient } from '../utils/trpc-client';
import getMobalyticsMatchupStats from './getMobalyticsMatchupStats';
import getOPGGMatchupStats from './getOPGGMatchupStats';
import getUGGMatchupStats from './getUGGMatchupStats';
import type { LoLChampionRole, RankTier } from '@prisma/client';

/**
 * Basic orchestrator to fetch & persist matchup stats for
 * ALL sources with a simple per-source concurrency limit.
 * Designed to keep resource usage low on hobby projects.
 *
 * Usage (example): pnpm script:run orchestrateMatchupStats
 * patchVersion=14.12.1 champions=ahri,lee-sin
 * roles=mid,jungle tiers=gold,platinum.
 */

interface OrchestrateMatchupStatsArgs {
  patchVersion: string;
  champions?: string; // comma separated
  roles?: string; // comma separated
  tiers?: string; // comma separated
  mobalyticsConcurrency?: string; // parseInt
  opggConcurrency?: string;
  uggConcurrency?: string;
}

interface TaskInput {
  patchVersion: string;
  championSlug: string;
  role: LoLChampionRole;
  rankTier: RankTier;
}

const DEFAULT_ROLES: Array<LoLChampionRole> = ['top', 'jungle', 'mid', 'adc', 'support'];
const DEFAULT_TIERS: Array<RankTier> = ['silver'];

export default async function orchestrateMatchupStats({
  patchVersion,
  champions,
  roles,
  tiers,
  mobalyticsConcurrency = '3',
  opggConcurrency = '3',
  uggConcurrency = '3',
}: OrchestrateMatchupStatsArgs) {
  if (!patchVersion) throw new Error('patchVersion is required');

  // Build arrays from CLI params or defaults
  const championList = champions ? champions.split(',') : [];
  if (championList.length === 0) {
    throw new Error('At least one champion slug must be provided via "champions" param');
  }
  const roleList: LoLChampionRole[] = roles ? (roles.split(',') as LoLChampionRole[]) : DEFAULT_ROLES;
  const tierList: RankTier[] = tiers ? (tiers.split(',') as RankTier[]) : DEFAULT_TIERS;

  // --- NEW: Fetch all champions and their mainRoles ---
  const client = createClient();
  const championsResp = await client.champion.getAllBasic.query({});
  const championsDb = championsResp.result?.champions ?? [];
  const mainRolesMap = new Map<string, LoLChampionRole[]>();
  championsDb.forEach((champ) => {
    mainRolesMap.set(champ.slug, champ.mainRoles ?? []);
  });

  // Create task arrays per source, filtering by mainRoles
  const buildTasks = (): TaskInput[] => {
    const tasks: TaskInput[] = [];
    for (const champion of championList) {
      const mainRoles = mainRolesMap.get(champion) ?? [];
      for (const role of roleList) {
        if (!mainRoles.includes(role)) {
          console.log(`[orchestrator] Skipping ${champion} ${role} (not a main role)`);
          continue;
        }
        for (const tier of tierList) {
          tasks.push({ patchVersion, championSlug: champion, role, rankTier: tier });
        }
      }
    }
    return tasks;
  };

  const mobalyticsTasks = buildTasks();
  const opggTasks = buildTasks();
  const uggTasks = buildTasks();

  console.log(
    `[orchestrator] Prepared tasks. Total per source → Mobalytics: ${mobalyticsTasks.length}, OP.GG: ${opggTasks.length}, U.GG: ${uggTasks.length}`,
  );

  // Helper to run tasks with concurrency and log progress
  const runTasks = async (
    source: string,
    tasks: TaskInput[],
    concurrency: number,
    runner: (input: TaskInput) => Promise<void>,
  ) => {
    console.log(`[orchestrator] Starting ${source} tasks with concurrency ${concurrency}`);

    let completed = 0;
    await mapWithConcurrency(tasks, concurrency, async (task) => {
      await runner(task);
      completed += 1;
      if (completed % 10 === 0) {
        console.log(`[${source}] Progress: ${completed}/${tasks.length}`);
      }
    });

    console.log(`[orchestrator] Finished ${source} tasks.`);
  };

  await runTasks('Mobalytics', mobalyticsTasks, Number(mobalyticsConcurrency), (task) =>
    getMobalyticsMatchupStats(task),
  );
  await runTasks('OP.GG', opggTasks, Number(opggConcurrency), (task) => getOPGGMatchupStats(task));
  await runTasks('U.GG', uggTasks, Number(uggConcurrency), (task) => getUGGMatchupStats(task));

  console.log('[orchestrator] All sources completed.');
}
