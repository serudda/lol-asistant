import React from 'react';
import type { PopoverProps } from '../../Overlays';
import { Popover } from '../../Overlays';
import { Content, Empty, Item, List, Loading, Search, Trigger } from './internal';

export interface ComboboxProps extends PopoverProps {
  children: React.ReactNode;
}

export const Combobox = ({ ...props }: ComboboxProps) => <Popover {...props} />;

Combobox.Content = Content;
Combobox.Empty = Empty;
Combobox.Item = Item;
Combobox.List = List;
Combobox.Loading = Loading;
Combobox.Search = Search;
Combobox.Trigger = Trigger;
