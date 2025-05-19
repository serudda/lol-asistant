export default async function handler(req: Request) {
  const { appRouter } = await import('../../packages/api/src/root');
  const { createTRPCContext } = await import('../../packages/api/src/trpc');
  const { fetchRequestHandler } = await import('@trpc/server/adapters/fetch');

  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
}
