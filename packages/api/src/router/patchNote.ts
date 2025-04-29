import { createPatchNoteHandler, getLatestPatchNoteHandler } from '../controllers/patchNote.controller';
import { createPatchNoteInput, getLatestPatchNoteInput } from '../schemas/patchNote.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const patchNoteRouter = createTRPCRouter({
  getLatest: publicProcedure
    .input(getLatestPatchNoteInput)
    .query(({ ctx, input }) => getLatestPatchNoteHandler({ ctx, input })),

  createPatchNote: publicProcedure
    .input(createPatchNoteInput)
    .mutation(({ ctx, input }) => createPatchNoteHandler({ ctx, input })),
});
