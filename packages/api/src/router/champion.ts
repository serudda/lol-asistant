import {
  createChampionHandler,
  getAllBasicChampionsHandler,
  getBasicChampionByIdHandler,
  getBasicChampionBySlugHandler,
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

  getBasicById: publicProcedure
    .input(getChampionByIdInput)
    .query(({ ctx, input }) => getBasicChampionByIdHandler({ ctx, input })),

  getBySlug: publicProcedure
    .input(getChampionBySlugInput)
    .query(({ ctx, input }) => getChampionBySlugHandler({ ctx, input })),

  getBasicBySlug: publicProcedure
    .input(getChampionBySlugInput)
    .query(({ ctx, input }) => getBasicChampionBySlugHandler({ ctx, input })),

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
