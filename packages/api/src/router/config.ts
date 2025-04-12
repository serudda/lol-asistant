import { getConfigHandler } from '../controllers/config.controller';
import { getConfigInput } from '../schemas/config.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const configRouter = createTRPCRouter({
  getConfig: publicProcedure
    .input(getConfigInput)
    .query(async ({ ctx, input }) => getConfigHandler({ ctx, input })),
});
