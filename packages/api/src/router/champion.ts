import {
  createChampionHandler,
  getAllBasicChampionsHandler,
  getChampionByIdHandler,
  getChampionBySlugHandler,
  updateChampionHandler,
} from '../controllers/champion.controller';
import {
  createChampionInput,
  getAllBasicChampionsInput,
  getChampionByIdInput,
  getChampionBySlugInput,
  updateChampionInput,
} from '../schemas/champion.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const championRouter = createTRPCRouter({
  getById: publicProcedure
    .input(getChampionByIdInput)
    .query(({ ctx, input }) => getChampionByIdHandler({ ctx, input })),

  getBySlug: publicProcedure
    .input(getChampionBySlugInput)
    .query(({ ctx, input }) => getChampionBySlugHandler({ ctx, input })),

  getAllBasic: publicProcedure
    .input(getAllBasicChampionsInput)
    .query(({ ctx, input }) => getAllBasicChampionsHandler({ ctx, input })),

  createChampion: publicProcedure
    .input(createChampionInput)
    .mutation(({ ctx, input }) => createChampionHandler({ ctx, input })),

  updateChampion: publicProcedure
    .input(updateChampionInput)
    .mutation(({ ctx, input }) => updateChampionHandler({ ctx, input })),
});
