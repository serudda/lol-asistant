/**
 * This file exports all functions that need to be
 * accessible for Vercel cron jobs. Scripts that should only
 * be run locally don't need to be exported here.
 */

// Script exports for use in cron jobs
export { default as createChampion } from './scripts/createChampion';
export { default as getChampionById } from './scripts/getChampionById';
export { default as getLatestPatchNote } from './scripts/getLatestPatchNote/getLatestPatchNote';
export { default as updateChampion } from './scripts/updateChampion';
// Add more exports as needed when creating new scripts
// export { default as anotherScript } from './scripts/another-script';
