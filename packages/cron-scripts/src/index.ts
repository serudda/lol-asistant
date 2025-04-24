/**
 * This file exports all functions that need to be
 * accessible for Vercel cron jobs. Scripts that should only
 * be run locally don't need to be exported here.
 */

// Script exports for use in cron jobs
export { default as sampleScript } from './scripts/sample-script';
export { default as testChampionEndpoint } from './scripts/test-champion-endpoint';

// Add more exports as needed when creating new scripts
// export { default as anotherScript } from './scripts/another-script';
