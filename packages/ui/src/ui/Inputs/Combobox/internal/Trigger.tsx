import { forwardRef } from 'react';
import { Popover } from '../../../Overlays';
import { ChevronDown } from 'lucide-react';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: [
    'px-3.5',
    'border border-gray-700/60',
    'hover:border-gray-700/20 hover:bg-gray-800',
    'font-normal text-sm leading-normal',
    'flex items-center justify-between p-2',
    'rounded appearance-none outline-none truncate',
    'h-8',
    'w-full transition duration-100 ease-out',
  ],
  variants: {
    hasValue: {
      true: 'text-white',
      false: 'text-gray-300',
    },
  },
});

const icon = tv({
  base: 'text-white',
});

export interface TriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Delegates the rendering of the item to its single child
   * element.
   */
  asChild?: boolean;

  /**
   * The value of the button.
   */
  value?: string;

  /**
   * The placeholder of the button.
   */
  placeholder: string;
}

/**
 * `Trigger` represents a trigger of the combobox.
 */
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, value, placeholder, ...props }, ref) => {
    const classes = {
      trigger: trigger({
        hasValue: !!value,
        className,
      }),
      icon: icon(),
    };

    return (
      <Popover.Trigger ref={ref} asChild>
        <button {...props} className={classes.trigger}>
          {value ?? placeholder}
          <ChevronDown className={classes.icon} width={16} height={16} />
        </button>
      </Popover.Trigger>
    );
  },
);

Trigger.displayName = 'Trigger';
