import { useState } from 'react';
import { LoLChampionRole } from '@lol-assistant/db';
import { Avatar, AvatarSize, Table } from '@lol-assistant/ui';
import { RoleIcon } from '../RoleIcon/RoleIcon';
import type { CounterTableData } from './types';
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

const columns: ColumnDef<CounterTableData>[] = [
  {
    accessorKey: 'rank',
    size: 5,
    header: ({ column }) => {
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (column.getIsSorted() === 'asc') return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };

      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center gap-2"
        >
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
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (column.getIsSorted() === 'asc') return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };

      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center gap-2"
        >
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
    accessorKey: 'weightedWinRate',
    size: 50,
    header: ({ column }) => {
      const renderIcon = () => {
        if (!column.getIsSorted()) return <ChevronsUpDown size={16} />;
        if (column.getIsSorted() === 'asc') return <ChevronUp size={16} className="text-neutral-50" />;
        return <ChevronDown size={16} className="text-neutral-50" />;
      };

      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center gap-2"
        >
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
  data?: Array<CounterTableData>;
}

/**
 * This is the table that displays the counter champions
 * list.
 */
export const CounterList = ({ className, data = [] }: CounterListProps) => {
  const classes = table({ className });
  const [sorting, setSorting] = useState<SortingState>([]);

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
            {headerGroup.headers.map((header) => {
              return (
                <Table.Head key={header.id} style={{ width: `${header.column.getSize()}px` }}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </Table.Head>
              );
            })}
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

export { type CounterTableData };
