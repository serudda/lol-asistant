import { createFileRoute, Link } from '@tanstack/react-router';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-96">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to LoL Assistant</h1>
      <p className="text-lg text-gray-400 text-center mb-8 max-w-2xl">
        Your ultimate companion for League of Legends champion analysis and counter picks.
      </p>
      <Link
        to="/champions"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        Pick a Champion
      </Link>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});
