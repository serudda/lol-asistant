import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const getChampionByIdInput = z.object({
  id: z.string(),
});
export type GetChampionByIdInputType = TypeOf<typeof getChampionByIdInput>;

/*------------------------------------*/

export const getChampionBySlugInput = z.object({
  slug: z.string(),
});
export type GetChampionBySlugInputType = TypeOf<typeof getChampionBySlugInput>;

/*------------------------------------*/

export const createChampionInput = z.object({
  name: z.string(),
  slug: z.string(),
  imageUrl: z.string().default(''),
  stats: z.record(z.string(), z.any()).default({}),
  spells: z.record(z.string(), z.any()).default({}),
  passive: z.record(z.string(), z.any()).default({}),
});
export type CreateChampionInputType = TypeOf<typeof createChampionInput>;

/*------------------------------------*/
