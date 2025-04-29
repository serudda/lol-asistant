import { accountRouter } from './router/account';
import { championRouter } from './router/champion';
import { configRouter } from './router/config';
import { patchNoteRouter } from './router/patchNote';
import { userRouter } from './router/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  account: accountRouter,
  champion: championRouter,
  config: configRouter,
  user: userRouter,
  patchNote: patchNoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
