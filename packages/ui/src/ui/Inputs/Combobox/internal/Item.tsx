import type { ComponentProps, ReactNode } from 'react';
import { Command } from '../../../Command/Command';
import { tv } from 'tailwind-variants';

const item = tv({
  base: [
    'relative flex cursor-default gap-2',
    'select-none items-center rounded-sm py-3 px-4 text-sm outline-none',
    'data-[disabled=true]:pointer-events-none data-[selected=true]:bg-gray-500 data-[selected=true]:text-gray-50',
    'data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
});

export interface ItemProps extends ComponentProps<typeof Command.Item> {
  /**
   * Elements to display inside the Item.
   */
  children: ReactNode;

  /**
   * Specify an optional className to be added to the body
   * section.
   */
  className?: string;
}

/**
 * `Item` represents the item inside the list of the
 * combobox.
 */
export const Item = ({ className, children, ...props }: ItemProps) => {
  const classes = item({ className });

  return (
    <Command.Item className={classes} {...props}>
      {children}
    </Command.Item>
  );
};

Item.displayName = 'Item';
