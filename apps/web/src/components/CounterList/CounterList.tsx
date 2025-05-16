import { useMemo, useState } from 'react';
import { type Source } from '@lol-assistant/db';
import { Table } from '@lol-assistant/ui';
import { getSourceColumns, getStaticColumns } from './columns';
import type { ChampionCounterRow } from './types';
import { flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { tv, type VariantProps } from 'tailwind-variants';

const table = tv({
  base: 'w-full table-fixed',
});

interface CounterListProps extends VariantProps<typeof Table> {
  /**
   * The class name of the table.
   */
  className?: string;

  /**
   * The data to display in the table.
   */
  data?: Array<ChampionCounterRow>;

  /**
   * The sources to pass to getSourceColumns.
   */
  sources?: Array<Source>;
}

/**
 * This is the table that displays the counter champions
 * list.
 */
export const CounterList = ({ className, data = [], sources = [] }: CounterListProps) => {
  const classes = table({ className });
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo(() => {
    return [...getStaticColumns(), ...getSourceColumns(sources)];
  }, [sources, data]);

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
      <Table.Header className="px-3">
        {counterTable.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head className="h-14 first:pl-4" key={header.id} style={{ width: `${header.column.getSize()}px` }}>
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
