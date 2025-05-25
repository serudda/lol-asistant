export const CounterListSkeleton = () => {
  return (
    <div className="w-full">
      <div className="w-full animate-pulse">
        <div className="flex flex-col gap-3">
          <div className="flex">
            <div className="h-14 flex-1 bg-gray-700 rounded" style={{ minWidth: 90 }} />
          </div>
          {[...Array(24)].map((_, i) => (
            <div key={i} className="flex">
              <div className="h-10 flex-1 bg-gray-800 rounded" style={{ minWidth: 50 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
