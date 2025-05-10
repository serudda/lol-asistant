import { createSourceMatchupStatHandler } from '../controllers/sourceMatchupStat.controller';
import { createSourceMatchupStatInput } from '../schemas/sourceMatchupStat.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const sourceMatchupStatRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSourceMatchupStatInput)
    .mutation(({ ctx, input }) => createSourceMatchupStatHandler({ ctx, input })),
});
