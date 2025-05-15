import { useMemo, useState } from 'react';
import { LoLChampionRole } from '@lol-assistant/db';
import { Avatar, AvatarSize, Table } from '@lol-assistant/ui';
import { RoleIcon } from '../RoleIcon/RoleIcon';
import type { ChampionCounterRow, SourceStat } from './types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const table = tv({
  base: 'w-full table-fixed',
});

// Factory returning the static column definitions
const getStaticColumns = (): ColumnDef<ChampionCounterRow>[] => [
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
    size: 40,
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Avatar size={AvatarSize.sm}>
            <Avatar.Image src={row.original.imageUrl} />
            <Avatar.Fallback>{row.original.champion.slice(0, 1)}</Avatar.Fallback>
          </Avatar>
          <span className="text-sm font-medium">{row.original.champion}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 5,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <RoleIcon role={row.original.role as LoLChampionRole} className="size-5" />
        </div>
      );
    },
  },
  {
    accessorKey: 'overallWinRate',
    size: 50,
    header: ({ column }) => {
      const isAsc = column.getIsSorted() === 'asc';

      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (isAsc) return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };

      return (
        <div onClick={() => column.toggleSorting(isAsc)} className="flex cursor-pointer items-center gap-2">
          Win Rate
          {renderIcon()}
        </div>
      );
    },
  },
];

interface CounterListProps extends VariantProps<typeof Table> {
  /**
   * The class name of the table.
   */
  className?: string;

  /**
   * The data to display in the table.
   */
  data?: Array<ChampionCounterRow>;
}

/**
 * This is the table that displays the counter champions
 * list.
 */
export const CounterList = ({ className, data = [] }: CounterListProps) => {
  const classes = table({ className });
  const [sorting, setSorting] = useState<SortingState>([]);

  // Collect dynamic keys (Sources like Mobalytics, etc.)
  const sourceKeys = useMemo(() => {
    const keys = new Set<string>();
    data.forEach((row) => {
      row.sourceStats.forEach((stat) => keys.add(stat.name));
    });
    return Array.from(keys);
  }, [data]);

  // Dynamic columns for each provider
  const sourceColumns: ColumnDef<ChampionCounterRow>[] = sourceKeys.map((key) => ({
    id: key,
    header: () => {
      // Try to get icon from first row (all rows expected to have same icon per provider)
      const firstRow = data[0] as ChampionCounterRow | undefined;
      const stat = firstRow?.sourceStats.find((s) => s.name === key);
      return (
        <div className="flex items-center gap-1 justify-center">
          {stat?.iconUrl && <img src={stat.iconUrl} alt={key} className="size-4 inline-block" />}
          <span>{key}</span>
        </div>
      );
    },
    accessorFn: (row) => row.sourceStats.find((s) => s.name === key) || null,
    cell: ({ getValue }) => {
      const stat = getValue() as SourceStat | null;
      if (!stat) return null;
      return (
        <div className="flex flex-col items-start">
          <span className="font-medium">{stat.winRate.toFixed(2)}%</span>
          <span className="text-xs text-gray-400">{stat.matches.toLocaleString()} matches</span>
        </div>
      );
    },
    size: 60,
  }));

  const columns = useMemo<ColumnDef<ChampionCounterRow>[]>(() => {
    return [...getStaticColumns(), ...sourceColumns];
  }, [sourceColumns]);

  const counterTable = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table className={classes}>
      <Table.Header>
        {counterTable.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head key={header.id} style={{ width: `${header.column.getSize()}px` }}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {counterTable.getRowModel().rows?.length ? (
          counterTable.getRowModel().rows.map((row) => (
            <Table.Row key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
              ))}
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={columns.length} className="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export { type ChampionCounterRow };
