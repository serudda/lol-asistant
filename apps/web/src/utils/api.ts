import { type AppRouter } from '@lol-assistant/api';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api/trpc';

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV !== 'production' || (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: apiUrl,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from '@lol-assistant/api';
export * from '@lol-assistant/api/src/common';
export * from '@lol-assistant/db/common';
