import * as React from 'react';
import type { toggle as toggleClasses} from '../Buttons/Toggle/Toggle';
import { ToggleAppearance, ToggleSize, ToggleVariant } from '../Buttons/Toggle/Toggle';
import { Item } from './internal';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { Root } from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

export const ToggleGroupContext = React.createContext<VariantProps<typeof toggleClasses>>({
  appearance: ToggleAppearance.outlined,
  size: ToggleSize.base,
  variant: ToggleVariant.primary,
});

export type ToggleGroupProps = ToggleGroupSingleProps &
  VariantProps<typeof toggleClasses> & {
    /**
     * The type of toggle group.
     */
    type: 'single' | 'multiple';
  };

export type ToggleGroupComponent = React.ForwardRefExoticComponent<
  ToggleGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof Item;
};

const toggleGroup = tv({ base: 'flex items-center gap-1' });

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type, variant, size, children, ...props }, ref) => {
    const classes = toggleGroup({ className });

    return (
      <Root ref={ref} {...props} className={classes} type={type}>
        <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
      </Root>
    );
  },
) as ToggleGroupComponent;
ToggleGroup.Item = Item;

ToggleGroup.displayName = 'ToggleGroup';
