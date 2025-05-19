import { appRouter } from '../../packages/api/src/root';
import { createTRPCContext } from '../../packages/api/src/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export default function handler(req: Request) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
}
