import * as React from 'react';
import {
  Command as CmdkCommand,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandLoading,
  CommandRoot,
  CommandSeparator,
} from 'cmdk';

const BaseCommand = React.forwardRef<
  React.ElementRef<typeof CmdkCommand>,
  React.ComponentPropsWithoutRef<typeof CmdkCommand>
>(({ ...props }, ref) => <CmdkCommand ref={ref} {...props} />);

export interface CommandComponent
  extends React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof CmdkCommand> & React.RefAttributes<React.ElementRef<typeof CmdkCommand>>
  > {
  Root: typeof CommandRoot;
  Input: typeof CommandInput;
  List: typeof CommandList;
  Item: typeof CommandItem;
  Dialog: typeof CommandDialog;
  Empty: typeof CommandEmpty;
  Group: typeof CommandGroup;
  Loading: typeof CommandLoading;
  Separator: typeof CommandSeparator;
}

/**
 * This is a wrapper around the `cmdk` library. A command
 * menu component can be used as an accessible combobox. You
 * render items, it filters and sorts them automatically.
 *
 * @see https://github.com/pacocoursey/cmdk
 */
export const Command = BaseCommand as CommandComponent;

Command.Root = CommandRoot;
Command.Input = CommandInput;
Command.List = CommandList;
Command.Item = CommandItem;
Command.Dialog = CommandDialog;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Loading = CommandLoading;
Command.Separator = CommandSeparator;
