import type { ComponentProps, ReactNode } from 'react';
import { Command } from '../../../Command/Command';
import { tv } from 'tailwind-variants';

const list = tv({
  base: 'max-h-80 overflow-y-auto overflow-x-hidden p-2',
});

export interface ListProps extends ComponentProps<typeof Command.List> {
  /**
   * Elements to display inside the List.
   */
  children: ReactNode;

  /**
   * Specify an optional className to be added to the body
   * section.
   */
  className?: string;
}

/**
 * `List` represents the list inside the combobox.
 */
export const List = ({ className, children, ...props }: ListProps) => {
  const classes = list({ className });

  return (
    <Command.List className={classes} {...props}>
      {children}
    </Command.List>
  );
};

List.displayName = 'List';
