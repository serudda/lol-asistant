import { roleEnum } from './types';
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

export const getAllBasicChampionsInput = z.object({});
export type GetAllBasicChampionsInputType = TypeOf<typeof getAllBasicChampionsInput>;

/*------------------------------------*/

export const createChampionInput = z.object({
  name: z.string(),
  slug: z.string(),
  mainRoles: z.array(roleEnum).default([]),
  imageUrl: z.string().default(''),
  stats: z.record(z.string(), z.any()).default({}),
  spells: z.array(z.record(z.string(), z.any())).default([]),
  passive: z.record(z.string(), z.any()).default({}),
  lastPatchVersion: z.string(),
});
export type CreateChampionInputType = TypeOf<typeof createChampionInput>;

/*------------------------------------*/

export const updateChampionInput = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  mainRoles: z.array(roleEnum).optional(),
  imageUrl: z.string().optional(),
  stats: z.record(z.string(), z.any()).optional(),
  spells: z.array(z.record(z.string(), z.any())).optional(),
  passive: z.record(z.string(), z.any()).optional(),
  isActive: z.boolean().optional(),
  lastPatchVersion: z.string().optional(),
});
export type UpdateChampionInputType = TypeOf<typeof updateChampionInput>;

/*------------------------------------*/
