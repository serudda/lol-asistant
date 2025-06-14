import * as React from 'react';
import { useMemo } from 'react';
import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import type { ChampionCounterRow, ChampionFilterOption } from '../components';
import {
  ChampionFilter,
  ChampionSearchBar,
  CounterLegend,
  CounterList,
  MatchupsOverviewCard,
  PatchCombobox,
  RoleToggleGroup,
} from '../components';
import { CounterListSkeleton } from '../components/CounterList/Skeleton';
import type { SourceStat } from '../components/CounterList/types';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [searchValue, setSearchValue] = React.useState('volibear');
  const [rankTier] = React.useState<RankTier>(RankTier.silver);
  const [role, setRole] = React.useState<LoLChampionRole>(LoLChampionRole.jungle);
  const [patch, setPatch] = React.useState<string>();
  const [championFilter, setChampionFilter] = React.useState<string>('');

  const { data: countersData, isLoading: isCountersLoading } = trpc.championMatchup.getChampionCounters.useQuery({
    opponentChampionSlug: searchValue,
    rankTier,
    role,
    patchVersion: patch,
  });

  const { data: sourcesData, isLoading: isSourcesLoading } = trpc.source.getAll.useQuery({});

  // get lastest patch
  const { data: latestPatchData } = trpc.patchNote.getLatest.useQuery({});

  const tableData: Array<ChampionCounterRow> = useMemo(() => {
    // No data yet
    if (!countersData?.result?.counters) return [];

    // Optional filtering by champion slug ("" means no filter)
    const filteredCounters = championFilter
      ? countersData.result.counters.filter((counter) => counter.opponentChampion.slug === championFilter)
      : countersData.result.counters;

    return filteredCounters.map((counter, index) => {
      // Build dynamic provider columns (e.g. Mobalytics, U.GG, etc.)
      const sourceStats: Array<SourceStat> = counter.sourceStats.map((stat) => ({
        slug: stat.source.name.toLowerCase().replace(/\s+/g, '-'),
        name: stat.source.name,
        logoUrl: stat.source.logoUrl,
        winRate: Number((100 - stat.winRate).toFixed(1)),
        matches: stat.matches,
        sourceUrl: stat.sourceUrl,
      }));

      return {
        rank: index + 1,
        champion: counter.opponentChampion.name,
        thumbnailUrl: counter.opponentChampion.thumbnailUrl ?? '',
        role: counter.role,
        rankTier: counter.rankTier,
        overallWinRate: Number((100 - counter.weightedWinRate).toFixed(1)),
        totalMatches: counter.totalMatches.toLocaleString(),
        sourceStats,
      } as ChampionCounterRow;
    });
  }, [countersData, championFilter]);

  const filterOptions: Array<ChampionFilterOption> = useMemo(() => {
    return (
      countersData?.result?.counters?.map((counter) => ({
        value: counter.opponentChampion.slug,
        label: counter.opponentChampion.name,
        imageUrl: counter.opponentChampion.thumbnailUrl,
      })) ?? []
    );
  }, [countersData]);

  React.useEffect(() => {
    if (latestPatchData?.result?.patchNote) {
      setPatch(latestPatchData.result.patchNote.patchVersion);
    }
  }, [latestPatchData]);

  const renderList = () => {
    if (isCountersLoading || isSourcesLoading) return <CounterListSkeleton />;

    if (!countersData || !sourcesData) return null;

    return (
      <div className="w-full">
        <CounterList data={tableData} sources={sourcesData.result.sources} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col max-w-5xl">
      <h1 className="text-3xl text-left font-bold mb-4">Pick a Champ</h1>

      <div className="w-full">
        <ChampionSearchBar defaultValue={searchValue} onChange={setSearchValue} />
      </div>

      <div className="flex flex-col border border-gray-800 rounded-xl p-4 mt-8">
        <div className="flex items-center p-2 justify-between">
          <RoleToggleGroup defaultValue={role} onValueChange={setRole} />
          <PatchCombobox defaultValue={patch} onChange={setPatch} className="max-w-32" />
        </div>

        <hr className="w-full mt-4 mb-8 border-t border-gray-900" />

        <div className="w-full flex gap-6">
          <MatchupsOverviewCard
            type="easiest"
            championSlug={searchValue}
            role={role}
            patchVersion={patch}
            rankTier={rankTier}
          />
          <MatchupsOverviewCard
            type="hardest"
            championSlug={searchValue}
            role={role}
            patchVersion={patch}
            rankTier={rankTier}
          />
        </div>

        <hr className="w-full my-8 border-t border-gray-900" />

        <div className="flex flex-col gap-4 w-full">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Matchups</h2>
            <span className="text-gray-500 text-base">({countersData?.result?.counters?.length} champions)</span>
          </div>

          {/* Filters */}
          <div className="flex justify-start items-end gap-4">
            <ChampionFilter
              options={filterOptions}
              defaultValue={championFilter}
              onChange={setChampionFilter}
              className="max-w-52"
            />
            <CounterLegend className="ml-auto" />
          </div>

          {/* Counters List */}
          {renderList()}
        </div>
      </div>
    </div>
  );
};
