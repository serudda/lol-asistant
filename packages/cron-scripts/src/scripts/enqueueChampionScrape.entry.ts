import { enqueueChampionScrape } from '../championScrape/enqueueChampionScrape.cli';

export default enqueueChampionScrape;

/**
 * Run the script `pnpm script:run
 * enqueueChampionScrape.entry --allowUpdate=true`
 *
 * This script enqueues jobs for all champions in the DB.
 * This is the first step to start the champion-scrape
 * worker.
 */
