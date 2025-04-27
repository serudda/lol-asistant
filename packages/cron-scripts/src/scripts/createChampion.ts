import { createClient } from '../utils/trpc-client';

type CreateChampionOptions = {
  name: string;
  slug: string;
  imageUrl: string;
  stats?: Record<string, any>;
  spells?: Record<string, any>;
  passive?: Record<string, any>;
};

const scriptId = 'createChampion';

/**
 * Script to test the createChampion endpoint.
 */
export default async function createChampion(options: CreateChampionOptions): Promise<{ status: string; result: any }> {
  const { name, slug, imageUrl, stats, spells, passive } = options;

  // Provide default values if not specified
  const payload = {
    name,
    slug,
    imageUrl,
    stats: stats ?? {},
    spells: spells ?? {},
    passive: passive ?? {},
  };

  console.log(`[${scriptId}] Creating champion with payload:`, payload);
  const client = createClient();

  try {
    const result = await client.champion.createChampion.mutate(payload);
    console.log(`[${scriptId}] Champion created successfully:`, result);
    return { status: 'success', result };
  } catch (error: any) {
    console.error(`[${scriptId}] Error creating champion:`, error);
    return { status: 'error', result: error instanceof Error ? error.message : String(error) };
  }
}

/*
  Run the script
  `pnpm script:run createChampion name="Ahri" slug="ahri" imageUrl="https://ddragon.leagueoflegends.com/cdn/15.8.1/img/champion/Ahri.png" \
  stats="{}" spells="{}" passive="{}"`
 
  This script creates a champion in the database.
 */
