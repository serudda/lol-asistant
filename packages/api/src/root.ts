import { accountRouter } from './router/account';
import { configRouter } from './router/config';
import { userRouter } from './router/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  account: accountRouter,
  config: configRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
