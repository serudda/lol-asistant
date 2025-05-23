import {
  calculateChampionMatchupStatsHandler,
  createChampionMatchupHandler,
  getAllIdsByChampionSlugHandler,
  getAllIdsByPatchVersionHandler,
  getChampionCountersHandler,
} from '../controllers/championMatchup.controller';
import {
  calculateChampionMatchupStatsInput,
  createChampionMatchupInput,
  getAllIdsByChampionSlugInput,
  getAllIdsByPatchVersionInput,
  getChampionCountersInput,
} from '../schemas/championMatchup.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championMatchupRouter = createTRPCRouter({
  getAllIdsByPatchVersion: publicProcedure
    .input(getAllIdsByPatchVersionInput)
    .query(({ ctx, input }) => getAllIdsByPatchVersionHandler({ ctx, input })),

  getAllIdsByChampionSlug: publicProcedure
    .input(getAllIdsByChampionSlugInput)
    .query(({ ctx, input }) => getAllIdsByChampionSlugHandler({ ctx, input })),

  create: publicProcedure
    .input(createChampionMatchupInput)
    .mutation(({ ctx, input }) => createChampionMatchupHandler({ ctx, input })),

  calculateStats: publicProcedure
    .input(calculateChampionMatchupStatsInput)
    .mutation(({ ctx, input }) => calculateChampionMatchupStatsHandler({ ctx, input })),

  getChampionCounters: publicProcedure
    .input(getChampionCountersInput)
    .query(({ ctx, input }) => getChampionCountersHandler({ ctx, input })),
});
