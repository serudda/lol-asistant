import {
  createPatchNoteHandler,
  getLatestPatchNoteHandler,
  getPatchNoteByVersionHandler,
} from '../controllers/patchNote.controller';
import { createPatchNoteInput, getLatestPatchNoteInput, getPatchNoteByVersionInput } from '../schemas/patchNote.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const patchNoteRouter = createTRPCRouter({
  getLatest: publicProcedure
    .input(getLatestPatchNoteInput)
    .query(({ ctx, input }) => getLatestPatchNoteHandler({ ctx, input })),

  createPatchNote: publicProcedure
    .input(createPatchNoteInput)
    .mutation(({ ctx, input }) => createPatchNoteHandler({ ctx, input })),

  getByVersion: publicProcedure
    .input(getPatchNoteByVersionInput)
    .query(({ ctx, input }) => getPatchNoteByVersionHandler({ ctx, input })),
});
