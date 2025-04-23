import * as React from 'react';
import { Image as RadixImage } from '@radix-ui/react-avatar';
import { tv } from 'tailwind-variants';

const image = tv({
  base: ['aspect-square h-full w-full'],
});

export type ImageProps = React.ComponentPropsWithoutRef<typeof RadixImage> & {};

/**
 * The `Content` component is used to display the container
 * with the content of a Tooltip.
 */
export const Image = React.forwardRef<React.ElementRef<typeof RadixImage>, ImageProps>(
  ({ className, ...props }, ref) => {
    const classes = image({ className });

    return <RadixImage ref={ref} className={classes} {...props} />;
  },
);

Image.displayName = RadixImage.displayName;
