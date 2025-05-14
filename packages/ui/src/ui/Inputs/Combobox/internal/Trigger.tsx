import { forwardRef } from 'react';
import { Popover } from '../../../Overlays';
import type { TriggerSizeType } from '../types';
import { TriggerSize } from '../types';
import { ChevronDown } from 'lucide-react';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: [
    'border border-gray-700/60',
    'hover:border-gray-700/20 hover:bg-gray-800',
    'font-normal leading-normal',
    'flex items-center justify-between p-2',
    'rounded appearance-none outline-none truncate',
    'w-full transition duration-100 ease-out',
  ],
  variants: {
    hasValue: {
      true: 'text-white',
      false: 'text-gray-300',
    },
    size: {
      [TriggerSize.base]: 'h-8 pl-3.5 pr-2 text-sm',
      [TriggerSize.lg]: 'h-10 pl-3.5 pr-3 text-base',
    },
  },
});

const icon = tv({
  base: 'text-white ml-auto',
  variants: {
    size: {
      [TriggerSize.base]: 'size-4',
      [TriggerSize.lg]: 'size-5',
    },
  },
});

export interface TriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /**
   * Delegates the rendering of the item to its single child
   * element.
   */
  asChild?: boolean;

  /**
   * The value of the button.
   */
  value?: React.ReactNode | string;

  /**
   * The size of the button.
   */
  size?: TriggerSizeType;

  /**
   * The placeholder of the button.
   */
  placeholder?: string;
}

/**
 * `Trigger` represents a trigger of the combobox.
 */
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, value, placeholder, size = TriggerSize.base, ...props }, ref) => {
    const classes = {
      trigger: trigger({
        hasValue: !!value,
        size,
        className,
      }),
      icon: icon({ size }),
    };

    return (
      <Popover.Trigger ref={ref} asChild>
        <button {...props} className={classes.trigger}>
          {value ?? placeholder}
          <ChevronDown className={classes.icon} />
        </button>
      </Popover.Trigger>
    );
  },
);

Trigger.displayName = 'Trigger';
