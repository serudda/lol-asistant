import { createFileRoute } from '@tanstack/react-router';

const ChampionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col max-w-5xl">
      Champions Page which should redirect to a one champion detail page
    </div>
  );
};

export const Route = createFileRoute('/champions/')({
  component: ChampionsPage,
});
