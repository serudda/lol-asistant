import * as React from 'react';
import type { ButtonAppearanceType, ButtonSizeType, ButtonVariantType } from './types';
import { ButtonAppearance, ButtonSize, ButtonVariant } from './types';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: [
    'inline-flex flex-shrink-0 items-center justify-center',
    'relative',
    'select-none',
    'whitespace-nowrap font-normal leading-normal',
    'transition-[border,background-color,color,opacity] duration-100 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    appearance: {
      [ButtonAppearance.contained]: '',
      [ButtonAppearance.outlined]: '',
      [ButtonAppearance.ghost]: '',
    },
    isActive: {
      true: '',
    },
    isFullWidth: {
      true: 'w-full',
    },
    size: {
      [ButtonSize.sm]: 'py-2 px-2 text-xs h-6 rounded',
      [ButtonSize.base]: 'px-3.5 text-sm h-8 rounded',
    },
    variant: {
      [ButtonVariant.primary]: '',
      [ButtonVariant.neutral]: '',
    },
  },
  compoundVariants: [
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.primary,
      className: ['border border-primary-400/20', 'bg-primary-500 hover:bg-primary-400', 'text-white'],
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.neutral,
      className: ['border border-gray-700/20', 'bg-gray-800 hover:bg-gray-700', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.primary,
      className: ['hover:bg-primary-500', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.neutral,
      className: ['hover:bg-gray-800', 'text-white'],
    },
  ],
  defaultVariants: {
    appearance: ButtonAppearance.contained,
    isFullWidth: false,
    size: ButtonSize.base,
    variant: ButtonVariant.primary,
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  /**
   * The appearance of the button.
   */
  appearance?: ButtonAppearanceType;

  /**
   * If true, the button will be rendered as a child
   * element. This is useful when you need to use the button
   * as a link or other element.
   */
  asChild?: boolean;

  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * If true, the button will be active.
   */
  isActive?: boolean;

  /**
   * If true, the button will be full width.
   */
  isFullWidth?: boolean;

  /**
   * The size of the button.
   */
  size?: ButtonSizeType;

  /**
   * The variant of the button.
   */
  variant?: ButtonVariantType;
}

/**
 * Buttons are used to initialize an action. Button labels
 * express what action will occur when the user interacts
 * with it.
 *
 * @see https://www.uiguideline.com/components/button
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      appearance,
      size,
      variant = ButtonVariant.primary,
      isFullWidth,
      asChild = false,
      isActive = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const classes = button({ appearance, size, variant, isFullWidth, isActive, className });

    return <Component className={classes} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export { ButtonAppearance, ButtonSize, ButtonVariant };
export type { ButtonAppearanceType, ButtonSizeType, ButtonVariantType };
