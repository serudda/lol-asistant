import {
  calculateChampionMatchupStatsHandler,
  createChampionMatchupHandler,
} from '../controllers/championMatchup.controller';
import { calculateChampionMatchupStatsInput, createChampionMatchupInput } from '../schemas/championMatchup.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championMatchupRouter = createTRPCRouter({
  create: publicProcedure
    .input(createChampionMatchupInput)
    .mutation(({ ctx, input }) => createChampionMatchupHandler({ ctx, input })),

  calculateStats: publicProcedure
    .input(calculateChampionMatchupStatsInput)
    .mutation(({ ctx, input }) => calculateChampionMatchupStatsHandler({ ctx, input })),
});
