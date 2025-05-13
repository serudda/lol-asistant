import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const tfooter = tv({
  base: ['border-t border-neutral-700 font-medium [&>tr]:last:border-b-0 bg-neutral-800'],
});

export interface TFooterProps extends React.HTMLAttributes<HTMLTableSectionElement>, VariantProps<typeof tfooter> {}

/**
 * The `Footer` component is used to display the footer of a
 * Table component.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Footer = React.forwardRef<HTMLTableSectionElement, TFooterProps>(({ className, ...props }, ref) => {
  const classes = tfooter({ className });

  return <tfoot className={classes} ref={ref} {...props} />;
});

Footer.displayName = 'Footer';
