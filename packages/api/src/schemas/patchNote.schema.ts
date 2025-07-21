import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const getLatestPatchNoteInput = z.object({});
export type GetLatestPatchNoteInputType = TypeOf<typeof getLatestPatchNoteInput>;

/*------------------------------------*/

export const getPatchNoteByVersionInput = z.object({
  patchVersion: z.string(),
});
export type GetPatchNoteByVersionInputType = TypeOf<typeof getPatchNoteByVersionInput>;

/*------------------------------------*/

export const getLastTwoPatchNotesInput = z.object({});
export type GetLastTwoPatchNotesInputType = TypeOf<typeof getLastTwoPatchNotesInput>;

/*------------------------------------*/

export const createPatchNoteInput = z.object({
  summary: z.string(),
  patchVersion: z.string(),
  riotPatch: z.string(),
  publishedDate: z.string(),
  embedding: z.array(z.number()),
  isActive: z.boolean().optional(),
});
export type CreatePatchNoteInputType = TypeOf<typeof createPatchNoteInput>;

/*------------------------------------*/
