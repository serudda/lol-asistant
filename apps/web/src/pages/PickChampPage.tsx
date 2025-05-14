import * as React from 'react';
import { useMemo } from 'react';
import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { Button, ButtonSize, ButtonVariant } from '@lol-assistant/ui';
import { ChampionCombobox, CounterList, CounterTableData, RankTierCombobox, RoleToggleGroup } from '../components';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [rankTier, setRankTier] = React.useState<RankTier>(RankTier.iron);
  const [role, setRole] = React.useState<LoLChampionRole>(LoLChampionRole.top);

  const { data: countersData } = trpc.championMatchup.getChampionCounters.useQuery({
    opponentChampionSlug: value,
    rankTier,
  });

  const tableData: Array<CounterTableData> = useMemo(() => {
    return (
      countersData?.result?.counters?.map((counter, index) => ({
        rank: index + 1,
        champion: counter.opponentChampion.name,
        imageUrl: counter.opponentChampion.imageUrl ?? '',
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

      <div className="w-full max-w-md mx-auto">
        <RankTierCombobox defaultValue={rankTier} onChange={setRankTier} />
      </div>

      <div className="w-full max-w-md mx-auto">
        <RoleToggleGroup defaultValue={role} onValueChange={setRole} />
      </div>

      <Button variant={ButtonVariant.primary} size={ButtonSize.lg}>
        Pick Champ
      </Button>

      {countersData && (
        <div className="w-full max-w-3xl mx-auto">
          <CounterList data={tableData} />
        </div>
      )}
    </div>
  );
};
