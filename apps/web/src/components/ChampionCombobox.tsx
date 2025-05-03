import * as React from 'react';
import { Avatar, AvatarSize, Combobox, TriggerSize } from '@lol-assistant/ui';
import { trpc } from '../utils/api';

export interface ChampionComboboxOption {
  value: string;
  label: string;
  imageUrl?: string | null;
}

interface ChampionComboboxProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The value of the champion.
   */
  defaultValue: string;

  /**
   * The function to call when the value changes.
   */
  onChange: (value: string) => void;

  /**
   * The placeholder of the combobox.
   */
  placeholder?: string;

  /**
   * Whether the combobox is disabled.
   */
  disabled?: boolean;
}

/**
 * A combobox for selecting a Champion.
 */
export const ChampionCombobox = ({
  defaultValue,
  onChange,
  placeholder = 'Select a champion',
  disabled = false,
  className = '',
}: ChampionComboboxProps) => {
  const { data } = trpc.champion.getAllBasic.useQuery({});
  const [open, setOpen] = React.useState(false);

  const options: Array<ChampionComboboxOption> = React.useMemo(() => {
    if (!data?.result?.champions) return [];
    return data.result.champions.map((champ) => ({
      value: champ.slug,
      label: champ.name,
      imageUrl: champ.imageUrl,
    }));
  }, [data]);

  const getLabel = React.useMemo(() => {
    return options.find((item) => item.value === defaultValue)?.label;
  }, [defaultValue, options]);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setOpen(false);
  };

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <Combobox.Trigger
        placeholder={placeholder}
        value={getLabel}
        size={TriggerSize.lg}
        className={`w-full ${className}`}
        disabled={disabled}
      />
      <Combobox.Content className="w-full">
        <Combobox.Search placeholder="Search a champion" />
        <Combobox.List>
          <Combobox.Empty>No champions found</Combobox.Empty>
          {options.map((item) => (
            <Combobox.Item key={item.value} value={item.value} onSelect={handleSelect}>
              <Avatar size={AvatarSize.sm}>
                <Avatar.Image src={item.imageUrl as string} />
                <Avatar.Fallback>{item.label.slice(0, 2)}</Avatar.Fallback>
              </Avatar>
              {item.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
};
