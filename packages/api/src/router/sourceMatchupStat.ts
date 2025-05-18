import {
  alreadyExistsSourceMatchupStatHandler,
  createSourceMatchupStatHandler,
} from '../controllers/sourceMatchupStat.controller';
import {
  alreadyExistsSourceMatchupStatsInput,
  createSourceMatchupStatInput,
} from '../schemas/sourceMatchupStat.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const sourceMatchupStatRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSourceMatchupStatInput)
    .mutation(({ ctx, input }) => createSourceMatchupStatHandler({ ctx, input })),
  alreadyExists: publicProcedure
    .input(alreadyExistsSourceMatchupStatsInput)
    .query(({ ctx, input }) => alreadyExistsSourceMatchupStatHandler({ ctx, input })),
});
