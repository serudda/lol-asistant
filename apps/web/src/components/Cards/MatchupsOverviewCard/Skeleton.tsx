export const MatchupsOverviewCardSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex animate-pulse h-6 max-w-56 bg-gray-800 rounded" />
      <div className="w-full flex animate-pulse h-64 bg-gray-800 rounded" />
    </div>
  );
};
