import { createChampionMatchupHandler } from '../controllers/championMatchup.controller';
import { createChampionMatchupInput } from '../schemas/championMatchup.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championMatchupRouter = createTRPCRouter({
  create: publicProcedure
    .input(createChampionMatchupInput)
    .mutation(({ ctx, input }) => createChampionMatchupHandler({ ctx, input })),
});
