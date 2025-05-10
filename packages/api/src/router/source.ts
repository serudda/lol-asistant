import { createSourceHandler, getSourceByIdHandler, getSourceBySlugHandler } from '../controllers/source.controller';
import { createSourceInput, getSourceByIdInput, getSourceBySlugInput } from '../schemas/source.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const sourceRouter = createTRPCRouter({
  getById: publicProcedure.input(getSourceByIdInput).query(({ ctx, input }) => getSourceByIdHandler({ ctx, input })),

  getBySlug: publicProcedure
    .input(getSourceBySlugInput)
    .query(({ ctx, input }) => getSourceBySlugHandler({ ctx, input })),

  createChampion: publicProcedure
    .input(createSourceInput)
    .mutation(({ ctx, input }) => createSourceHandler({ ctx, input })),
});
