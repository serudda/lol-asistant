import { Response } from '@lol-assistant/api';
import { createClient } from '../../../utils/trpc-client';
import type { ChampionSaveInput } from '../common/types';
import type { JsonValue } from '@prisma/client/runtime/library';

const transformJsonValue = (value: JsonValue | null): Record<string, any> | undefined => {
  if (value === null) return undefined;
  return value as Record<string, any>;
};

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
      stats: transformJsonValue(champion.stats),
      spells: transformJsonValue(champion.spells),
      passive: transformJsonValue(champion.passive),
      lastPatchVersion: patchVersion,
    };

    // If the champion already exists, update it
    if (existingChampion.result.status === Response.SUCCESS && existingChampion.result.champion) {
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
