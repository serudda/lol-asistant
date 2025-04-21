import * as React from 'react';
import type { ButtonAppearanceType, ButtonSizeType, ButtonVariantType } from './types';
import { ButtonAppearance, ButtonSize, ButtonVariant } from './types';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: [
    'flex items-center justify-center gap-2',
    'relative overflow-hidden',
    'text-center whitespace-nowrap',
    'rounded-md',
    'transition duration-100 ease-out',
    'cursor-pointer select-none',
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
      [ButtonSize.sm]: 'py-2 px-3.5 text-xs font-normal h-6',
      [ButtonSize.base]: 'py-3 px-4 text-sm font-normal h-8',
      [ButtonSize.lg]: 'py-3 px-5 text-base font-normal h-9',
      [ButtonSize.xl]: 'py-3 px-5 text-lg font-semibold h-9.5',
    },
    variant: {
      [ButtonVariant.primary]: '',
      [ButtonVariant.bull]: '',
      [ButtonVariant.bear]: '',
      [ButtonVariant.neutral]: '',
    },
  },
  compoundVariants: [
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.bull,
      className: 'bg-transparent ring-1 ring-bull-800/80 text-bull-500 hover:bg-bull-800/30',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.bull,
      isActive: true,
      className: 'bg-bull-800/30',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.bear,
      className: 'bg-transparent ring-1 ring-bear-600/50 text-bear-500 hover:bg-bear-800/30',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.bear,
      isActive: true,
      className: 'bg-bear-800/30',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.primary,
      className: 'bg-transparent ring-1 ring-primary text-primary hover:bg-neutral-600',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.primary,
      isActive: true,
      className: 'bg-neutral-600',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.neutral,
      className: 'bg-transparent ring-1 ring-neutral-600 text-primary hover:bg-neutral-700',
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.neutral,
      isActive: true,
      className: 'bg-neutral-700',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.primary,
      className: 'bg-primary text-black hover:bg-neutral-200',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.primary,
      isActive: true,
      className: 'bg-neutral-200',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.neutral,
      className: 'bg-neutral-700 text-white hover:bg-neutral-500',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.neutral,
      isActive: true,
      className: 'bg-neutral-500',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.bear,
      className: 'bg-bear-800/30 text-white ring-1 ring-bear-600/50 hover:bg-bear-800/50',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.bear,
      isActive: true,
      className: 'bg-bear-800/50',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.bull,
      className: 'bg-bull-800/30 text-white ring-1 ring-bull-600/50 hover:bg-bull-800/60',
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.bull,
      isActive: true,
      className: 'bg-bull-800/60',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.primary,
      className: 'bg-transparent text-primary hover:bg-primary/20',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.primary,
      isActive: true,
      className: 'bg-primary/20',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.neutral,
      className: 'bg-transparent text-primary hover:bg-neutral-700',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.neutral,
      isActive: true,
      className: 'bg-neutral-700',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.bear,
      className: 'bg-transparent text-bear-500 hover:bg-bear-800/30',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.bear,
      isActive: true,
      className: 'bg-bear-800/30',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.bull,
      className: 'bg-transparent text-bull-500 hover:bg-bull-800/30',
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.bull,
      isActive: true,
      className: 'bg-bull-800/30',
    },
  ],
  defaultVariants: {
    appearance: ButtonAppearance.outlined,
    isFullWidth: false,
    size: ButtonSize.base,
    variant: ButtonVariant.bull,
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
