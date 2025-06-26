import { createFileRoute, redirect } from '@tanstack/react-router';

const ChampionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col max-w-5xl">
      Champions Page which should redirect to a one champion detail page
    </div>
  );
};

export const Route = createFileRoute('/champions/')({
  beforeLoad: () => {
    // Redirect to a default champion
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({
      to: '/champions/$championName',
      params: { championName: 'volibear' },
    });
  },
  component: ChampionsPage,
});
