import { syncAllChampionsStats } from '../syncAllChampionsStats/cli';

export default syncAllChampionsStats;

/*
  Run the script `pnpm script:run syncAllChampionsStats.entry`

  Example: `pnpm script:run syncAllChampionsStats.entry`

  This script coordinates the process of fetching all champion stats
  from the League of Legends Data Dragon API for the latest patch,
  processing each champion individually, and saving/updating them in the database.
 */
