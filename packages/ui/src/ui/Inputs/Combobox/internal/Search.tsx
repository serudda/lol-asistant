import type { ComponentProps} from 'react';
import { forwardRef } from 'react';
import { Command } from '../../../Command/Command';
import { Search as SearchIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'flex items-center border-b border-neutral-500 px-3',
});

const input = tv({
  base: [
    'flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none',
    'placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
  ],
});

const icon = tv({
  base: 'mr-2 shrink-0 opacity-50',
});

export interface SearchProps extends ComponentProps<typeof Command.Input> {
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
export const Search = forwardRef<HTMLInputElement, SearchProps>(({ className, ...props }, ref) => {
  const classes = {
    container: container({ className }),
    input: input(),
    icon: icon(),
  };

  return (
    <div className={classes.container}>
      <SearchIcon className={classes.icon} size={16} />
      <Command.Input ref={ref} className={classes.input} {...props} />
    </div>
  );
});
