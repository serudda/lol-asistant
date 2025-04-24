import { getChampionByIdHandler } from '../controllers/champion.controller';
import { getChampionByIdInput } from '../schemas/champion.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championRouter = createTRPCRouter({
  getById: publicProcedure
    .input(getChampionByIdInput)
    .query(({ ctx, input }) => getChampionByIdHandler({ ctx, input })),
});
