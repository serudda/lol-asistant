import { useState } from 'react';
import { Table } from './Table';
import type { Meta, StoryObj } from '@storybook/react';
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

type CryptoTransaction = {
  transactionId: string;
  paymentStatus: string;
  amount: string;
  paymentMethod: string;
};

const cryptoTransactions: Array<CryptoTransaction> = [
  {
    transactionId: 'TX001',
    paymentStatus: 'Confirmed',
    amount: '0.005 BTC',
    paymentMethod: 'Bitcoin',
  },
  {
    transactionId: 'TX002',
    paymentStatus: 'Pending',
    amount: '2.3 ETH',
    paymentMethod: 'Ethereum',
  },
  {
    transactionId: 'TX003',
    paymentStatus: 'Failed',
    amount: '500 USDT',
    paymentMethod: 'Tether',
  },
  {
    transactionId: 'TX004',
    paymentStatus: 'Confirmed',
    amount: '1.2 SOL',
    paymentMethod: 'Solana',
  },
  {
    transactionId: 'TX005',
    paymentStatus: 'Confirmed',
    amount: '0.03 BTC',
    paymentMethod: 'Bitcoin',
  },
  {
    transactionId: 'TX006',
    paymentStatus: 'Pending',
    amount: '250 USDC',
    paymentMethod: 'USD Coin',
  },
  {
    transactionId: 'TX007',
    paymentStatus: 'Failed',
    amount: '3.5 BNB',
    paymentMethod: 'Binance Coin',
  },
];

const meta = {
  title: 'UI Components/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex h-full w-full items-center justify-center text-white">
      <Table {...args}>
        <Table.Caption>A list of your recent transactions.</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head className="w-[150px]">Transaction ID</Table.Head>
            <Table.Head className="w-[150px]">Status</Table.Head>
            <Table.Head>Method</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {cryptoTransactions.map((transaction) => (
            <Table.Row key={transaction.transactionId}>
              <Table.Cell className="font-medium">{transaction.transactionId}</Table.Cell>
              <Table.Cell>{transaction.paymentStatus}</Table.Cell>
              <Table.Cell>{transaction.paymentMethod}</Table.Cell>
              <Table.Cell className="text-right">{transaction.amount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={3}>Total</Table.Cell>
            <Table.Cell className="text-right">$2,500.00</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  ),
};

const columns: ColumnDef<CryptoTransaction>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'paymentMethod',
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex cursor-pointer items-center gap-2"
        >
          Payment Method
          <ArrowUpDown size={16} />
        </div>
      );
    },
  },
];

export const WithReactTable: Story = {
  render: (args) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
      data: cryptoTransactions,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
      },
    });

    return (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Table {...args}>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Head key={header.id} className="[&:has([role=checkbox])]:pl-3">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Head>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id} className="[&:has([role=checkbox])]:pl-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>
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
      </div>
    );
  },
};
