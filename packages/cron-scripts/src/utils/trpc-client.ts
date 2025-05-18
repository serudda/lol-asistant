import { type AppRouter } from '@lol-assistant/api';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

/**
 * Creates and returns a configured TRPC client.
 *
 * @returns TRPC client instance.
 */
export const createClient = () => {
  return createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: process.env.API_URL ?? 'http://localhost:4000/api/trpc',
      }),
    ],
  });
};
