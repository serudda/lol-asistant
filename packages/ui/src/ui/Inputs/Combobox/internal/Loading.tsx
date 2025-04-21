import type { ComponentProps, ReactNode } from 'react';
import { Command } from '../../../Command/Command';
import { tv } from 'tailwind-variants';

const loading = tv({
  base: 'py-3 flex items-center justify-center gap-2',
});

export interface LoadingProps extends ComponentProps<typeof Command.Loading> {
  /**
   * Specify an optional className to be added to the body
   * section.
   */
  className?: string;

  /**
   * Elements to display inside the Loading.
   */
  children?: ReactNode;
}

/**
 * `Loading` represents the loading state of the menu items.
 */
export const Loading = ({ className, children, ...props }: LoadingProps) => {
  const classes = loading({ className });

  return (
    <Command.Loading className={classes} {...props}>
      <div className={classes}>{children}</div>
    </Command.Loading>
  );
};
