import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const tcell = tv({
  base: ['p-2 align-middle'],
});

export interface TCellProps extends React.TdHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof tcell> {}

/**
 * The `Cell` component is used to display the cell of a
 * Table component. It is typically used to display the
 * table cells.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Cell = React.forwardRef<HTMLTableCellElement, TCellProps>(({ className, ...props }, ref) => {
  const classes = tcell({ className });

  return <td className={classes} ref={ref} {...props} />;
});

Cell.displayName = 'Cell';
