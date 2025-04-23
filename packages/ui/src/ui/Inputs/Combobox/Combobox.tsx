import React from 'react';
import type { PopoverProps } from '../../Overlays';
import { Popover } from '../../Overlays';
import { Content, Empty, Item, List, Loading, Search, Trigger } from './internal';

export interface ComboboxProps extends PopoverProps {
  children: React.ReactNode;
}

/**
 * Similar to the Select (Dropdown) but allowing the user to
 * edit the input field in order to sort through the list of
 * options.
 *
 * @see https://www.uiguideline.com/components/combobox
 */

export const Combobox = ({ ...props }: ComboboxProps) => <Popover {...props} />;

Combobox.Content = Content;
Combobox.Empty = Empty;
Combobox.Item = Item;
Combobox.List = List;
Combobox.Loading = Loading;
Combobox.Search = Search;
Combobox.Trigger = Trigger;

Combobox.displayName = 'Combobox';
