import { appRouter, type AppRouter } from './root';
import { createTRPCContext } from './trpc';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';

export * from './common';
export { appRouter, type AppRouter } from './root';
export { configService, ErrorCodes, ErrorMessages } from './services';
export { createTRPCContext } from './trpc';

/**
 * Inference helpers for input types.
 *
 * @example type HelloInput =
 * RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types.
 *
 * @example type HelloOutput =
 * RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// Config from environment variables
const PORT = process.env.API_PORT ? parseInt(process.env.API_PORT) : 4000;
const TRPC_PATH = '/api/trpc';

// Create Express server
const app = express();
app.use(cors());

// Create tRPC middleware
app.use(
  TRPC_PATH,
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
  console.log(`tRPC endpoint: http://localhost:${PORT}${TRPC_PATH}`);
});
