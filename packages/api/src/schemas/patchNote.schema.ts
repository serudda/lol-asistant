import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const getLatestPatchNoteInput = z.object({});
export type GetLatestPatchNoteInputType = TypeOf<typeof getLatestPatchNoteInput>;

/*------------------------------------*/

export const createPatchNoteInput = z.object({
  summary: z.string(),
  patchVersion: z.string(),
  publishedDate: z.string(),
  embedding: z.array(z.number()),
});

export type CreatePatchNoteInputType = TypeOf<typeof createPatchNoteInput>;

/*------------------------------------*/

export const getPatchNoteByVersionInput = z.object({
  patchVersion: z.string(),
});
export type GetPatchNoteByVersionInputType = TypeOf<typeof getPatchNoteByVersionInput>;

/*------------------------------------*/
