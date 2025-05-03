import { ResponseStatus } from '@lol-assistant/api';
import { createClient } from '../../../utils/trpc-client';
import type { ChampionSaveInput } from '../common/types';

export const saveChampion = async (champion: ChampionSaveInput, patchVersion: string): Promise<void> => {
  try {
    console.log(`[Saving] - Processing champion ${champion.slug} with patch ${patchVersion}...`);
    const client = createClient();

    // Try to get existing champion by slug
    const existingChampion = await client.champion.getBySlug.query({
      slug: champion.slug,
    });

    const championPayload = {
      name: champion.name,
      slug: champion.slug,
      imageUrl: champion.imageUrl ?? '',
      stats: champion.stats as Record<string, any>,
      spells: champion.spells as unknown as Record<string, any>[],
      passive: champion.passive as Record<string, any>,
      lastPatchVersion: patchVersion,
    };

    // If the champion already exists, update it
    if (existingChampion.result.status === ResponseStatus.SUCCESS && existingChampion.result.champion) {
      console.log(`[Saving] - Updating existing champion ${champion.slug}...`);
      await client.champion.updateChampion.mutate({
        id: existingChampion.result.champion.id,
        ...championPayload,
      });
    } else {
      // If the champion does not exist, create it
      console.log(`[Saving] - Creating new champion ${champion.slug}...`);
      await client.champion.createChampion.mutate(championPayload);
    }

    console.log(`[Saving] - Champion ${champion.slug} processed successfully.`);
  } catch (error) {
    console.error(`[Saving] - Error processing champion ${champion.slug}:`, error);
    throw error;
  }
};
