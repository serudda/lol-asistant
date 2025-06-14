import { ResponseStatus } from '@lol-assistant/api/src/common/constants';
import { createClient } from '../../utils/trpc-client';

export const updateChampion = async (
  championImages: {
    splashUrl: string;
    thumbnailUrl: string;
  },
  ddragonChampionSlug: string,
  patchVersion: string,
  existingChampionId?: string,
): Promise<boolean> => {
  try {
    console.log(`[Saving] - Processing champion ${ddragonChampionSlug} with patch ${patchVersion}...`);
    const client = createClient();

    // Check if the champion already exists
    if (!existingChampionId) return false;

    console.log(`[Saving] - Updating existing champion ${ddragonChampionSlug}...`);
    const response = await client.champion.updateChampion.mutate({
      id: existingChampionId,
      thumbnailUrl: championImages.thumbnailUrl ?? '',
      splashUrl: championImages.splashUrl ?? '',
    });

    if (response.result.status !== ResponseStatus.SUCCESS) {
      console.error(`[Saving] - Error updating champion ${ddragonChampionSlug}:`, response.result.error);
      return false;
    }

    console.log(`[Saving] - Champion ${ddragonChampionSlug} updated successfully.`);
    return true;
  } catch (error) {
    console.error(`[Saving] - Error processing champion ${ddragonChampionSlug}:`, error);
    throw error;
  }
};
