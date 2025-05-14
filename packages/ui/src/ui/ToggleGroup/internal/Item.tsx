import type { ReactNode } from 'react';
import * as React from 'react';
import { toggle as toggleClasses } from '../../Buttons/Toggle/Toggle';
import { ToggleGroupContext } from '../ToggleGroup';
import { Item as RadixItem } from '@radix-ui/react-toggle-group';
import { type VariantProps } from 'tailwind-variants';

export type ItemProps = React.ComponentPropsWithoutRef<typeof RadixItem> &
  VariantProps<typeof toggleClasses> & {
    /**
     * Elements to display inside the Item.
     */
    children: ReactNode;

    /**
     * Specify an optional className to be added to the body
     * section.
     */
    className?: string;
  };

/**
 * `Item` represents the item within the `ToggleGroup`.
 */
export const Item = ({ className, variant: variantProp, size: sizeProp, children, ...props }: ItemProps) => {
  const context = React.useContext(ToggleGroupContext);
  const classes = toggleClasses({ variant: context.variant ?? variantProp, size: context.size ?? sizeProp, className });

  return (
    <RadixItem className={classes} {...props}>
      {children}
    </RadixItem>
  );
};

Item.displayName = 'Item';
