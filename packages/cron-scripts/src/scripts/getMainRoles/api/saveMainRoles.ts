import { ResponseStatus } from '@lol-assistant/api';
import type { LoLChampionRole } from '@lol-assistant/db';
import { createClient } from '../../../utils/trpc-client';

export interface SaveMainRolesInput {
  championSlug: string;
  mainRoles: Array<LoLChampionRole>;
}

/**
 * Save mainRoles for a champion in the database.
 *
 * @param input championSlug y mainRoles.
 */
export const saveMainRoles = async (input: SaveMainRolesInput): Promise<{ id: string | undefined }> => {
  try {
    const { championSlug, mainRoles } = input;
    console.log(`[Saving] - Updating mainRoles for champion ${championSlug}:`, mainRoles);
    const client = createClient();

    // Search for the champion by slug
    const existingChampion = await client.champion.getBySlug.query({ slug: championSlug });
    if (!existingChampion.result.champion) {
      throw new Error(`[Saving] - Champion with slug ${championSlug} not found.`);
    }

    // Update the mainRoles field
    const response = await client.champion.updateChampion.mutate({
      id: existingChampion.result.champion.id,
      mainRoles,
    });

    // Check if the update was successful
    if (response.result.status !== ResponseStatus.SUCCESS) {
      throw new Error(`[Saving] - Failed to update mainRoles for champion ${championSlug}.`);
    }

    return {
      id: response.result.champion?.id,
    };
  } catch (error) {
    console.error(`[Saving] - Error updating mainRoles:`, error);
    throw error;
  }
};
