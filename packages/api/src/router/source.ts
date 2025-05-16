import {
  createSourceHandler,
  getAllSourcesHandler,
  getSourceByIdHandler,
  getSourceBySlugHandler,
} from '../controllers/source.controller';
import {
  createSourceInput,
  getAllSourcesInput,
  getSourceByIdInput,
  getSourceBySlugInput,
} from '../schemas/source.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const sourceRouter = createTRPCRouter({
  getById: publicProcedure.input(getSourceByIdInput).query(({ ctx, input }) => getSourceByIdHandler({ ctx, input })),

  getBySlug: publicProcedure
    .input(getSourceBySlugInput)
    .query(({ ctx, input }) => getSourceBySlugHandler({ ctx, input })),

  createChampion: publicProcedure
    .input(createSourceInput)
    .mutation(({ ctx, input }) => createSourceHandler({ ctx, input })),

  getAll: publicProcedure.input(getAllSourcesInput).query(({ ctx, input }) => getAllSourcesHandler({ ctx, input })),
});
