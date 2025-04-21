import * as React from 'react';
import { Content as RadixContent, Portal as RadixPortal } from '@radix-ui/react-tooltip';
import { tv } from 'tailwind-variants';

const content = tv({
  base: ['shadow-lg bg-neutral-900 rounded-md', 'outline-none z-50'],
});

export type ContentProps = React.ComponentPropsWithoutRef<typeof RadixContent> & {};

export const Content = React.forwardRef<React.ElementRef<typeof RadixContent>, ContentProps>(
  ({ className, align = 'center', sideOffset = 10, ...props }, ref) => {
    const classes = content({ className });

    return (
      <RadixPortal>
        <RadixContent ref={ref} align={align} sideOffset={sideOffset} className={classes} {...props} />
      </RadixPortal>
    );
  },
);
