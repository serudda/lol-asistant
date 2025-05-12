import * as React from 'react';
import { useMemo } from 'react';
import { ChampionCombobox, CounterList, CounterTableData } from '../components';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [value, setValue] = React.useState('');

  const { data: countersData } = trpc.championMatchup.getChampionCounters.useQuery({
    baseChampionId: value,
  });

  const tableData: Array<CounterTableData> = useMemo(() => {
    return (
      countersData?.result?.counters?.map((counter) => ({
        champion: counter.opponentChampion.name,
        role: counter.role,
        rankTier: counter.rankTier,
        weightedWinRate: counter.weightedWinRate.toFixed(2),
        totalMatches: counter.totalMatches.toLocaleString(),
      })) ?? []
    );
  }, [countersData]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Pick a Champ</h1>

      <div className="w-full max-w-md mx-auto">
        <ChampionCombobox defaultValue={value} onChange={setValue} />
      </div>

      {countersData && (
        <div className="w-full max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Counters</h2>
          <CounterList data={tableData} />
        </div>
      )}
    </div>
  );
};
