import { forwardRef } from 'react';
import { Popover } from '../../../Overlays';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: [
    'bg-gray-700',
    'font-light text-base',
    'flex items-center justify-between p-2',
    'border rounded-lg appearance-none outline-none truncate',
    'h-10',
    'w-full transition duration-100 ease-out',
  ],
  variants: {
    isActive: {
      true: 'border-primary-500',
      false: 'border-gray-400',
    },
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

  /**
   * Whether the button is active.
   */
  isActive?: boolean;
}

/**
 * `Trigger` represents a trigger of the combobox.
 */
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, value, placeholder, isActive = true, ...props }, ref) => {
    const classes = {
      button: trigger({
        isActive,
        hasValue: !!value,
        className,
      }),
      icon: icon(),
    };

    return (
      <Popover.Trigger ref={ref} asChild>
        <button {...props} className={classes.button}>
          {value ?? placeholder}
          {isActive ? (
            <ChevronUp className={classes.icon} width={24} height={24} />
          ) : (
            <ChevronDown className={classes.icon} width={24} height={24} />
          )}
        </button>
      </Popover.Trigger>
    );
  },
);
