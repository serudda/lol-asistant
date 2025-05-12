import { Table } from '@lol-assistant/ui';
import type { CounterTableData } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const table = tv({
  base: 'w-full',
});

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

  return (
    <Table className={classes}>
      <Table.Header>
        <Table.Row>
          <Table.Head>Rank</Table.Head>
          <Table.Head className="w-[150px]">Champion</Table.Head>
          <Table.Head>Rank Tier</Table.Head>
          <Table.Head>Role</Table.Head>
          <Table.Head>Win Rate</Table.Head>
          <Table.Head>Total Matches</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((element, index) => (
          <Table.Row key={element.champion}>
            <Table.Cell>{index + 1}</Table.Cell>
            <Table.Cell className="font-medium">{element.champion}</Table.Cell>
            <Table.Cell>{element.rankTier}</Table.Cell>
            <Table.Cell>{element.role}</Table.Cell>
            <Table.Cell className="text-right">{element.weightedWinRate}</Table.Cell>
            <Table.Cell className="text-right">{element.totalMatches}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export { type CounterTableData };
