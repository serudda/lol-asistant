import { LoLChampionRole, type Source } from '@lol-assistant/db';
import { Avatar, AvatarSize } from '@lol-assistant/ui';
import { RoleIcon } from '../RoleIcon/RoleIcon';
import type { ChampionCounterRow } from './types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

// Assign a bg color green to the overallWinRate column when it's above 50%, and a red bg color when it's below 50%
const getOverallWinRateBgColor = (overallWinRate: number) => {
  if (overallWinRate > 50) return 'bg-emerald-500/10';
  if (overallWinRate < 50) return 'bg-red-500/10';
  return 'bg-gray-500/20';
};

export const getStaticColumns = (): ColumnDef<ChampionCounterRow>[] => [
  {
    accessorKey: 'rank',
    size: 5,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };
      return (
        <div
          className="flex cursor-pointer items-center justify-center gap-2"
          onClick={() => column.toggleSorting(isAsc)}
        >
          Rank
          {renderIcon()}
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm font-medium">{row.original.rank}</span>
      </div>
    ),
  },
  {
    accessorKey: 'champion',
    size: 45,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };
      return (
        <div onClick={() => column.toggleSorting(isAsc)} className="flex cursor-pointer items-center gap-2">
          Champion
          {renderIcon()}
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar size={AvatarSize.sm}>
          <Avatar.Image src={row.original.imageUrl} />
          <Avatar.Fallback>{row.original.champion.slice(0, 1)}</Avatar.Fallback>
        </Avatar>
        <span className="text-sm font-medium">{row.original.champion}</span>
      </div>
    ),
  },
  {
    accessorKey: 'role',
    header: () => {
      return (
        <div className="flex flex-col items-center justify-center cursor-pointer gap-1">
          <span className="flex items-center gap-2">Role</span>
        </div>
      );
    },
    size: 10,
    cell: ({ row }) => (
      <div className="flex items-center justify-center gap-2">
        <RoleIcon role={row.original.role as LoLChampionRole} className="size-5" />
      </div>
    ),
  },
  {
    accessorKey: 'overallWinRate',
    size: 40,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };
      return (
        <div
          className="flex flex-col items-center justify-center cursor-pointer gap-1"
          onClick={() => column.toggleSorting(isAsc)}
        >
          <span className="flex items-center gap-2">Overall {renderIcon()}</span>
        </div>
      );
    },
    cell: ({ row }) => (
      <div
        className={`flex flex-col items-center text-center p-3 rounded-md ${getOverallWinRateBgColor(
          parseFloat(row.original.overallWinRate),
        )}`}
      >
        <span className="font-medium">{row.original.overallWinRate}%</span>
      </div>
    ),
  },
];

export const getSourceColumns = (sources: Array<Source>): Array<ColumnDef<ChampionCounterRow>> => {
  return sources.map((source) => ({
    id: source.name,
    size: 35,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };
      return (
        <div className="flex items-center gap-1 justify-center" onClick={() => column.toggleSorting(isAsc)}>
          {source.logoUrl && <img src={source.logoUrl} alt={source.name} className="size-5 inline-block mr-1" />}
          <span>{source.name}</span>
          {renderIcon()}
        </div>
      );
    },
    accessorFn: (row) => {
      const stat = row.sourceStats.find((s) => s.name === source.name);
      return stat ? stat.winRate : null;
    },
    cell: ({ row }) => {
      const stat = row.original.sourceStats.find((s) => s.name === source.name);
      if (!stat) return <div className="flex flex-col text-center p-3 rounded-md">No found</div>;

      return (
        <a
          href={stat.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col text-center p-3 rounded-md hover:bg-gray-500/20 cursor-pointer transition-colors"
          title={`See ${row.original.champion} counters on ${source.name}`}
        >
          <span className="font-medium">{stat.winRate.toFixed(2)}%</span>
        </a>
      );
    },
  }));
};
