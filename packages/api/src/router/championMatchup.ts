import {
  calculateChampionMatchupStatsHandler,
  createChampionMatchupHandler,
  getAllIdsByPatchVersionHandler,
} from '../controllers/championMatchup.controller';
import {
  calculateChampionMatchupStatsInput,
  createChampionMatchupInput,
  getAllIdsByPatchVersionInput,
} from '../schemas/championMatchup.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championMatchupRouter = createTRPCRouter({
  getAllIdsByPatchVersion: publicProcedure
    .input(getAllIdsByPatchVersionInput)
    .query(({ ctx, input }) => getAllIdsByPatchVersionHandler({ ctx, input })),

  create: publicProcedure
    .input(createChampionMatchupInput)
    .mutation(({ ctx, input }) => createChampionMatchupHandler({ ctx, input })),

  calculateStats: publicProcedure
    .input(calculateChampionMatchupStatsInput)
    .mutation(({ ctx, input }) => calculateChampionMatchupStatsHandler({ ctx, input })),
});
