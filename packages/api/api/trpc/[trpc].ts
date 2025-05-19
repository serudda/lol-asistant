// Adjust these paths if your appRouter or createTRPCContext are located elsewhere within packages/api/src

import { appRouter } from '../../src/root';
import { createTRPCContext } from '../../src/trpc';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import cors from 'cors';
import express, { type Express } from 'express';

const app: Express = express();

// Enable CORS. For production, consider:
// app.use(cors({ origin: 'https://www.matchub.app' }));
app.use(cors());

// Mount the tRPC middleware.
// Vercel routes /api/trpc/* to this file, so the base path here is '/'
app.use(
  '/',
  createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext,
  }),
);

// Export the app for Vercel to use as a handler
export default app;
