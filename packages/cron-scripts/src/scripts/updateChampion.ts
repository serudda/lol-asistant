import { createClient } from '../utils/trpc-client';

export type UpdateChampionOptions = {
  id: string;
  name?: string;
  slug?: string;
  imageUrl?: string;
  stats?: Record<string, any>;
  spells?: Record<string, any>;
  passive?: Record<string, any>;
  isActive?: boolean;
};

const scriptId = 'updateChampion';

/**
 * Script to test the updateChampion endpoint.
 */
export default async function updateChampion(options: UpdateChampionOptions): Promise<{ status: string; result: any }> {
  console.log(`[${scriptId}] Updating champion with data:`, options);
  const client = createClient();

  try {
    const result = await client.champion.updateChampion.mutate(options);
    console.log(`[${scriptId}] Champion updated successfully:`, result);
    return { status: 'success', result };
  } catch (error: any) {
    console.error(`[${scriptId}] Error updating champion:`, error);
    return { status: 'error', result: error instanceof Error ? error.message : String(error) };
  }
}

/*
  Run the script
  `pnpm script:run updateChampion id="862edc50-5e27-486b-92d9-13387f8f7d4b" name="Ahri"`
 
  This script updates a champion in the database.
 */
