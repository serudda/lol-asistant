import { ResponseStatus } from '@lol-assistant/api';
import { normalizeStringToSlug } from '../../common';
import { createClient } from '../../utils/trpc-client';
import { updateChampion } from '../db/updateChampion';
import { buildChampionImage } from './buildChampionImage';

const scriptId = 'buildChampionImage';

/**
 * Updates the splash and thumbnail URLs for a champion.
 *
 * @param patchVersion - The patch version of the game.
 * @param championSlug - The slug of the champion from Data
 *   Dragon.
 */
export const updateChampionImage = async (patchVersion: string, ddragonChampionSlug: string): Promise<void> => {
  console.log(`[${scriptId}] Starting building images for version: ${patchVersion}`);
  try {
    // ------------------------------------------------------------

    // Check if the champion already has stats for this patch version
    const client = createClient();
    const existingChampion = await client.champion.getBySlug.query({
      slug: normalizeStringToSlug(ddragonChampionSlug),
    });
    if (
      existingChampion.result.status !== ResponseStatus.SUCCESS ||
      existingChampion.result.champion?.lastPatchVersion !== patchVersion
    ) {
      console.log(`[${scriptId}] [Skipping] Champion ${ddragonChampionSlug} does not exist`);
      return;
    }
    const existingChampionId = existingChampion.result.champion?.id;

    // ------------------------------------------------------------

    // Build images champion object
    console.log(`[${scriptId}] [Parsing Champion Data] Extracting valuable stats for ${ddragonChampionSlug}`);
    const championImages = buildChampionImage(patchVersion, ddragonChampionSlug);

    // ------------------------------------------------------------

    // Update the champion with the new image URLs
    const isUpdated = await updateChampion(championImages, ddragonChampionSlug, patchVersion, existingChampionId);
    if (!isUpdated) {
      console.error(`[${scriptId}] Failed to update champion ${ddragonChampionSlug}`);
      return;
    }

    // ------------------------------------------------------------

    console.log(`[${scriptId}] Successfully processed image for ${ddragonChampionSlug}`);
  } catch (error) {
    console.error(`[buildChampionImage] Error building champion image for ${ddragonChampionSlug}:`, error);
    // Return null or throw error based on desired handling in the main loop
    throw new Error(`Failed to build champion image for ${ddragonChampionSlug}`);
  }
};
