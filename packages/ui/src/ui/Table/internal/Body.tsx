import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const tbody = tv({
  base: ['[&_tr:last-child]:border-0'],
});

export interface TBodyProps extends React.HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof tbody> {}

/**
 * The `Body` component is used to display the body of a
 * Table component. It is typically used to display the
 * table rows.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Body = React.forwardRef<HTMLTableSectionElement, TBodyProps>(({ className, ...props }, ref) => {
  const classes = tbody({ className });

  return <tbody className={classes} ref={ref} {...props} />;
});

Body.displayName = 'Body';
