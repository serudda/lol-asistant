import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <Outlet />
    </div>
  ),
});
