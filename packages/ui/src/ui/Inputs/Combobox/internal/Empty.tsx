import type { ComponentProps, ReactNode } from 'react';
import { Command } from '../../../Command/Command';
import { tv } from 'tailwind-variants';

const empty = tv({
  base: ['flex items-center justify-center', 'p-6', 'text-gray-400 font-regular text-sm'],
});

export interface EmptyProps extends ComponentProps<typeof Command.Empty> {
  /**
   * Elements to display inside the Tooltip.
   */
  children: ReactNode;

  /**
   * Specify an optional className to be added to the body
   * section.
   */
  className?: string;
}

/**
 * `Empty` represents the empty state of the combobox.
 */
export const Empty = ({ className, children, ...props }: EmptyProps) => {
  const classes = empty({ className });

  return (
    <Command.Empty className={classes} {...props}>
      {children}
    </Command.Empty>
  );
};

Empty.displayName = 'Empty';
