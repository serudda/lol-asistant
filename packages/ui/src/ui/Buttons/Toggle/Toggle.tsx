import * as React from 'react';
import { Root } from '@radix-ui/react-toggle';
import { tv, type VariantProps } from 'tailwind-variants';

const toggle = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'rounded-md transition-colors',
    'text-sm font-medium',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=on]:bg-primary-800 data-[state=on]:text-white',
    '[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    'border border-primary-600/60',
    'hover:border-primary-400/20 hover:bg-primary-500',
    'text-neutral-400',
  ],
});

export type ToggleProps = React.ComponentProps<typeof Root> & VariantProps<typeof toggle>;

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(({ className, ...props }, ref) => {
  const classes = toggle({ className });

  return <Root className={classes} {...props} ref={ref} />;
});

Toggle.displayName = 'Toggle';
