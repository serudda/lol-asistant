import { type AppRouter } from '@discord-bot/api';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  return `http://localhost:4000`;
};

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV !== 'production' || (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

export { type RouterInputs, type RouterOutputs } from '@discord-bot/api';
export * from '@discord-bot/api/src/common';
export * from '@discord-bot/db/common';
