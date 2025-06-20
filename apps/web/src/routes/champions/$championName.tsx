import { createFileRoute } from '@tanstack/react-router';

function ChampionDetailPage() {
  const { championName } = Route.useParams();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col max-w-5xl">
      <h1 className="text-3xl font-bold mb-4">Champion: {championName}</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-gray-300 mb-4">
          This is the detail page for <span className="text-blue-400 font-semibold">{championName}</span>.
        </p>
        <p className="text-gray-400 text-sm">
          Future features: champion stats, abilities, matchups analysis, builds, etc.
        </p>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/champions/$championName')({
  component: ChampionDetailPage,
});
