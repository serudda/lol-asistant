import * as React from 'react';
import {
  ToggleAppearance,
  ToggleSize,
  ToggleVariant,
  type ToggleAppearanceType,
  type ToggleSizeType,
  type ToggleVariantType,
} from './types';
import { Root } from '@radix-ui/react-toggle';
import { tv, type VariantProps } from 'tailwind-variants';

export const toggle = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'rounded-md transition-colors',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  variants: {
    appearance: {
      [ToggleAppearance.outlined]: '',
      [ToggleAppearance.ghost]: '',
    },
    size: {
      [ToggleSize.sm]: 'px-1 text-xs h-6 rounded [&_svg]:size-4',
      [ToggleSize.base]: 'px-1 text-sm h-8 rounded [&_svg]:size-6',
      [ToggleSize.lg]: 'px-3 text-base h-10 rounded [&_svg]:size-8',
    },
    variant: {
      [ToggleVariant.primary]: '',
      [ToggleVariant.neutral]: '',
    },
  },
  compoundVariants: [
    {
      appearance: ToggleAppearance.outlined,
      variant: ToggleVariant.primary,
      className: [
        'border border-primary-600/60',
        'text-white',
        'data-[state=off]:text-opacity-40',
        'data-[state=on]:bg-primary-800 data-[state=on]:text-white data-[state=on]:text-opacity-100',
        'hover:border-primary-600/60 hover:bg-primary-800 hover:data-[state=off]:text-white',
      ],
    },
    {
      appearance: ToggleAppearance.outlined,
      variant: ToggleVariant.neutral,
      className: [
        'border border-gray-700/60',
        'text-white',
        'data-[state=off]:text-opacity-40',
        'data-[state=on]:bg-gray-800 data-[state=on]:text-white data-[state=on]:text-opacity-100',
        'hover:border-gray-700/60 hover:bg-gray-800 hover:data-[state=off]:text-white',
      ],
    },
    {
      appearance: ToggleAppearance.ghost,
      variant: ToggleVariant.primary,
      className: [
        'text-white',
        'data-[state=off]:text-opacity-40',
        'data-[state=on]:bg-primary-900 data-[state=on]:text-white data-[state=on]:text-opacity-100',
        'hover:bg-primary-900 hover:data-[state=off]:text-white',
      ],
    },
    {
      appearance: ToggleAppearance.ghost,
      variant: ToggleVariant.neutral,
      className: [
        'text-white',
        'data-[state=off]:text-opacity-40',
        'data-[state=on]:bg-gray-900 data-[state=on]:text-white data-[state=on]:text-opacity-100',
        'hover:bg-gray-900 hover:data-[state=off]:text-white',
      ],
    },
  ],
  defaultVariants: {
    appearance: ToggleAppearance.outlined,
    size: ToggleSize.base,
    variant: ToggleVariant.primary,
  },
});

export type ToggleProps = React.ComponentProps<typeof Root> &
  VariantProps<typeof toggle> & {
    /**
     * The appearance of the toggle.
     */
    appearance?: ToggleAppearanceType;

    /**
     * The size of the button.
     */
    size?: ToggleSizeType;

    /**
     * The variant of the button.
     */
    variant?: ToggleVariantType;
  };

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      appearance = ToggleAppearance.outlined,
      size = ToggleSize.base,
      variant = ToggleVariant.primary,
      ...props
    },
    ref,
  ) => {
    const classes = toggle({ appearance, size, variant, className });

    return <Root className={classes} {...props} ref={ref} />;
  },
);

Toggle.displayName = 'Toggle';

export { ToggleAppearance, ToggleSize, ToggleVariant };
export type { ToggleAppearanceType, ToggleSizeType, ToggleVariantType };
