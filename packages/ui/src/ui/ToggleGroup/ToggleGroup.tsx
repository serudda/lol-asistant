import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const toggleGroup = tv({
  base: 'flex items-center gap-1',
});

export const ToggleGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toggleGroup>
>(({ className, ...props }, ref) => {
  const classes = toggleGroup({ className });

  return <div className={classes} {...props} ref={ref} />;
});
