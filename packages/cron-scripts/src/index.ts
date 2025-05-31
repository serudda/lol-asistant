/**
 * This file exports all functions that need to be
 * accessible for Vercel cron jobs. Scripts that should only
 * be run locally don't need to be exported here.
 */

// Script exports for use in cron jobs
export { getLatestPatchNote } from './getLatestPatchNote/cli';
export { default as getChampionById } from './scripts/getChampionById';
// export { default as getLatestPatchNote } from './scripts/getLatestPatchNote';
export { default as recalculateChampMatchupStats } from './scripts/recalculateChampMatchupStats';
export { default as syncAllChampions } from './scripts/syncAllChampions';
export { default as updateChampionStats } from './scripts/updateChampionStats';

// Add more exports as needed when creating new scripts
// export { default as anotherScript } from './scripts/another-script';
