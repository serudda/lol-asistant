import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const thead = tv({
  base: [
    'h-10 px-2 cursor-default',
    'text-neutral-400 text-left align-middle font-medium',
    '[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  ],
});

export interface THeadProps extends React.ThHTMLAttributes<HTMLTableCellElement>, VariantProps<typeof thead> {}

/**
 * The `Head` component is used to display the header of a
 * Table component. It is typically used to display the
 * table headers that are used to sort the table.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Head = React.forwardRef<HTMLTableCellElement, THeadProps>(({ className, ...props }, ref) => {
  const classes = thead({ className });

  return <th className={classes} ref={ref} {...props} />;
});

Head.displayName = 'Head';
