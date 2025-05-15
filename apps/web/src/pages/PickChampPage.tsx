import * as React from 'react';
import { useMemo } from 'react';
import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import {
  ChampionFilter,
  ChampionFilterOption,
  ChampionSearchBar,
  CounterList,
  CounterTableData,
  PatchCombobox,
  RankTierCombobox,
  RoleToggleGroup,
} from '../components';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('');
  const [rankTier, setRankTier] = React.useState<RankTier>(RankTier.iron);
  const [role, setRole] = React.useState<LoLChampionRole>(LoLChampionRole.mid);
  const [patch, setPatch] = React.useState<string>('');
  const [championFilter, setChampionFilter] = React.useState<string>('');

  const { data: countersData } = trpc.championMatchup.getChampionCounters.useQuery({
    opponentChampionSlug: searchValue,
    rankTier,
    role,
    patchVersion: patch,
  });

  const tableData: Array<CounterTableData> = useMemo(() => {
    // No data yet
    if (!countersData?.result?.counters) return [];

    // Optional filtering by champion slug ("" means no filter)
    const filteredCounters = championFilter
      ? countersData.result.counters.filter((counter) => counter.opponentChampion.slug === championFilter)
      : countersData.result.counters;

    return filteredCounters.map((counter, index) => ({
      rank: index + 1,
      champion: counter.opponentChampion.name,
      imageUrl: counter.opponentChampion.imageUrl ?? '',
      role: counter.role,
      rankTier: counter.rankTier,
      weightedWinRate: counter.weightedWinRate.toFixed(2),
      totalMatches: counter.totalMatches.toLocaleString(),
    }));
  }, [countersData, championFilter]);

  const filterOptions: Array<ChampionFilterOption> = useMemo(() => {
    return (
      countersData?.result?.counters?.map((counter) => ({
        value: counter.opponentChampion.slug,
        label: counter.opponentChampion.name,
        imageUrl: counter.opponentChampion.imageUrl,
      })) ?? []
    );
  }, [countersData]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col max-w-3xl">
      <h1 className="text-3xl text-left font-bold mb-4">Pick a Champ</h1>

      <div className="w-full">
        <ChampionSearchBar defaultValue={searchValue} onChange={setSearchValue} />
      </div>

      <div className="flex flex-col gap-4 w-full">
        <hr className="w-full my-8 border-t border-gray-800" />
        {/* Filters */}
        <div className="flex justify-start gap-4">
          <ChampionFilter
            options={filterOptions}
            defaultValue={championFilter}
            onChange={setChampionFilter}
            className="max-w-52"
          />
          <RoleToggleGroup defaultValue={role} onValueChange={setRole} />
          <RankTierCombobox defaultValue={rankTier} onChange={setRankTier} className="max-w-44" />
          <PatchCombobox defaultValue={patch} onChange={setPatch} className="max-w-24" />
        </div>

        {/* Counters List */}
        {countersData && (
          <div className="w-full">
            <CounterList data={tableData} />
          </div>
        )}
      </div>
    </div>
  );
};
