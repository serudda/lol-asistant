import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const trow = tv({
  base: ['border-b border-neutral-700 transition-colors hover:bg-neutral-700/50 data-[state=selected]:bg-neutral-700'],
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
