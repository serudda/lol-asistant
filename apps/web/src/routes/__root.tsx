import { useEffect } from 'react';
import { Footer, Navbar } from '../components';
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router';

const RootComponent = () => {
  const routerState = useRouterState();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [routerState.location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Outlet />
      <Footer className="mt-10" />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
