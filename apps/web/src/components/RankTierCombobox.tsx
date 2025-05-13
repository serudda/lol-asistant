import * as React from 'react';
import { Avatar, AvatarSize, Combobox, TriggerSize } from '@lol-assistant/ui';
import { rankTierOptions } from '../constants';

interface RankTierComboboxProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The value of the champion.
   */
  defaultValue?: string;

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
 * A combobox for selecting a rank tier.
 */
export const RankTierCombobox = ({
  defaultValue,
  onChange,
  placeholder = 'Select a rank tier',
  disabled = false,
  className = '',
}: RankTierComboboxProps) => {
  const [open, setOpen] = React.useState(false);

  const getLabel = React.useMemo(() => {
    return rankTierOptions.find((item) => item.value === defaultValue)?.label;
  }, [defaultValue, rankTierOptions]);

  const handleSelect = (slug: string) => {
    onChange?.(slug);
    setOpen(false);
  };

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <Combobox.Trigger
        placeholder={placeholder}
        value={getLabel}
        size={TriggerSize.base}
        className={`w-full ${className}`}
        disabled={disabled}
      />
      <Combobox.Content className="w-full">
        <Combobox.Search placeholder="Search a rank tier" />
        <Combobox.List>
          <Combobox.Empty>No rank tiers found</Combobox.Empty>
          {rankTierOptions.map((item) => (
            <Combobox.Item key={item.value} value={item.value} onSelect={handleSelect}>
              <Avatar size={AvatarSize.sm}>
                <Avatar.Image src={item.imageUrl as string} />
              </Avatar>
              {item.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
};
