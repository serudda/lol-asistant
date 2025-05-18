import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const getSourceByIdInput = z.object({
  id: z.string(),
});
export type GetSourceByIdInputType = TypeOf<typeof getSourceByIdInput>;

/*------------------------------------*/

export const getSourceBySlugInput = z.object({
  slug: z.string(),
});
export type GetSourceBySlugInputType = TypeOf<typeof getSourceBySlugInput>;

/*------------------------------------*/

export const getAllSourcesInput = z.object({});
export type GetAllSourcesInputType = TypeOf<typeof getAllSourcesInput>;

/*------------------------------------*/

export const createSourceInput = z.object({
  name: z.string(),
  slug: z.string(),
  logoUrl: z.string().url(),
  baseUrl: z.string().url(),
});
export type CreateSourceInputType = TypeOf<typeof createSourceInput>;

/*------------------------------------*/
