import { useEffect } from 'react';
import { Navbar } from '../components';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';

const RootComponent = () => {
  const routerState = useRouterState();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routerState.location.pathname]);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
