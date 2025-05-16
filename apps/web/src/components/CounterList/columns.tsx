import { LoLChampionRole } from '@lol-assistant/db';
import { Avatar, AvatarSize } from '@lol-assistant/ui';
import { RoleIcon } from '../RoleIcon/RoleIcon';
import type { ChampionCounterRow, SourceStat } from './types';
import { ColumnDef } from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

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
        <div onClick={() => column.toggleSorting(isAsc)} className="flex cursor-pointer items-center gap-2">
          Rank
          {renderIcon()}
        </div>
      );
    },
  },
  {
    accessorKey: 'champion',
    size: 60,
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
    header: 'Role',
    size: 10,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <RoleIcon role={row.original.role as LoLChampionRole} className="size-5" />
      </div>
    ),
  },
  {
    accessorKey: 'overallWinRate',
    size: 30,
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
          Win Rate
          {renderIcon()}
        </div>
      );
    },
    cell: ({ getValue }) => <span className="block w-full text-center font-medium">{getValue() as string}</span>,
  },
];

export const getSourceColumns = (data: ChampionCounterRow[]): ColumnDef<ChampionCounterRow>[] => {
  // Collect unique source names
  const sourceKeys = Array.from(new Set(data.flatMap((row) => row.sourceStats.map((stat) => stat.name))));
  return sourceKeys.map((key) => ({
    id: key,
    size: 40,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };

      const firstRow = data[0] as ChampionCounterRow | undefined;
      const stat = firstRow?.sourceStats.find((s) => s.name === key);
      return (
        <div className="flex items-center gap-1 justify-center" onClick={() => column.toggleSorting(isAsc)}>
          {stat?.logoUrl && <img src={stat.logoUrl} alt={key} className="size-4 inline-block" />}
          <span>{key}</span>
          {renderIcon()}
        </div>
      );
    },
    accessorFn: (row) => row.sourceStats.find((s) => s.name === key) || null,
    cell: ({ getValue }) => {
      const stat = getValue() as SourceStat | null;
      if (!stat) return null;

      return (
        <div className="flex flex-col text-center">
          <span className="font-medium">{stat.winRate.toFixed(2)}%</span>
          <span className="text-xs text-gray-500">{stat.matches.toLocaleString()} matches</span>
        </div>
      );
    },
  }));
};
