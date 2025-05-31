import { createClient } from '../../utils/trpc-client';
import type { ChampionSaveInput } from '../common/types';

export const saveChampion = async (
  champion: ChampionSaveInput,
  patchVersion: string,
  existingChampionId?: string,
): Promise<void> => {
  try {
    console.log(`[Saving] - Processing champion ${champion.slug} with patch ${patchVersion}...`);
    const client = createClient();

    // If the champion already exists, update it
    if (existingChampionId) {
      console.log(`[Saving] - Updating existing champion ${champion.slug}...`);
      await client.champion.updateChampion.mutate({
        id: existingChampionId,
        stats: champion.stats as Record<string, any>,
        spells: champion.spells as unknown as Record<string, any>[],
        passive: champion.passive as Record<string, any>,
        lastPatchVersion: patchVersion,
      });
    } else {
      // If the champion does not exist, create it
      console.log(`[Saving] - Creating new champion ${champion.slug}...`);
      await client.champion.createChampion.mutate({
        name: champion.name,
        slug: champion.slug,
        imageUrl: champion.imageUrl ?? '',
        stats: champion.stats as Record<string, any>,
        spells: champion.spells as unknown as Record<string, any>[],
        passive: champion.passive as Record<string, any>,
        lastPatchVersion: patchVersion,
        mainRoles: [],
      });
    }

    console.log(`[Saving] - Champion ${champion.slug} processed successfully.`);
  } catch (error) {
    console.error(`[Saving] - Error processing champion ${champion.slug}:`, error);
    throw error;
  }
};
