import { useEffect } from 'react';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';

const RootComponent = () => {
  const routerState = useRouterState();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routerState.location.pathname]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Outlet />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
