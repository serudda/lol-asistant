import { syncAllChampions } from '../syncAllChampionStats/cli';

export default syncAllChampions;

/*
  Run the script `pnpm script:run syncAllChampions.entry patchVersion=<game_version>`

  Example: `pnpm script:run syncAllChampions patchVersion=14.1.1`

  This script coordinates the process of fetching all champion data
  from the League of Legends Data Dragon API for a specific version,
  processing each champion individually, and saving/updating them in the database.
 */
