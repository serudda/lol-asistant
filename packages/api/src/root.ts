import { accountRouter } from './router/account';
import { championRouter } from './router/champion';
import { championMatchupRouter } from './router/championMatchup';
import { configRouter } from './router/config';
import { patchNoteRouter } from './router/patchNote';
import { sourceRouter } from './router/source';
import { sourceMatchupStatRouter } from './router/sourceMatchupStat';
import { userRouter } from './router/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  account: accountRouter,
  champion: championRouter,
  championMatchup: championMatchupRouter,
  config: configRouter,
  user: userRouter,
  patchNote: patchNoteRouter,
  source: sourceRouter,
  sourceMatchupStat: sourceMatchupStatRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
