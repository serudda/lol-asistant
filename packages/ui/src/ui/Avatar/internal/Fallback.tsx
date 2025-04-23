import * as React from 'react';
import { Fallback as RadixFallback } from '@radix-ui/react-avatar';
import { tv } from 'tailwind-variants';

const fallback = tv({
  base: ['flex items-center justify-center', 'h-full w-full', 'rounded-full bg-orange-300'],
});

export type FallbackProps = React.ComponentPropsWithoutRef<typeof RadixFallback> & {};

/**
 * The `Fallback` component is an element that renders when
 * the image hasn't loaded. This means whilst it's loading,
 * or if there was an error.
 */
export const Fallback = React.forwardRef<React.ElementRef<typeof RadixFallback>, FallbackProps>(
  ({ className, ...props }, ref) => {
    const classes = fallback({ className });

    return <RadixFallback ref={ref} className={classes} {...props} />;
  },
);

Fallback.displayName = RadixFallback.displayName;
