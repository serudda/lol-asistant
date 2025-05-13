import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const tcaption = tv({
  base: ['mt-4 text-sm text-neutral-300'],
});

export interface TCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement>, VariantProps<typeof tcaption> {}

/**
 * The `Caption` component is used to display the caption of
 * a Table component. It is typically used to display the
 * table caption.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Caption = React.forwardRef<HTMLTableCaptionElement, TCaptionProps>(({ className, ...props }, ref) => {
  const classes = tcaption({ className });

  return <caption className={classes} ref={ref} {...props} />;
});

Caption.displayName = 'Caption';
