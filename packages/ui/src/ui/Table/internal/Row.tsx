import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const trow = tv({
  base: ['border-b border-gray-800 transition-colors'],
});

export interface TRowProps extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof trow> {}

/**
 * The `Row` component is used to display the row of a Table
 * component. It is typically used to display the table
 * rows.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Row = React.forwardRef<HTMLTableRowElement, TRowProps>(({ className, ...props }, ref) => {
  const classes = trow({ className });

  return <tr className={classes} ref={ref} {...props} />;
});

Row.displayName = 'Row';
