import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const theader = tv({
  base: ['[&_tr]:border-b [&_tr]:border-neutral-600'],
});

export interface THeaderProps extends React.HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof theader> {}

/**
 * The `Header` component is used to display the header of a
 * Table component. It is typically used to display the
 * column headers.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Header = React.forwardRef<HTMLTableSectionElement, THeaderProps>(({ className, ...props }, ref) => {
  const classes = theader({ className });

  return <thead className={classes} ref={ref} {...props} />;
});

Header.displayName = 'Header';
