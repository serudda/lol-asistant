import * as React from 'react';
import type { RankTier } from '@lol-assistant/db';
import { Combobox, TriggerSize } from '@lol-assistant/ui';
import { rankTierOptions } from './rankTierOptions';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: 'pl-1',
});

interface RankTierComboboxProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The value of the champion.
   */
  defaultValue?: RankTier;

  /**
   * The function to call when the value changes.
   */
  onChange: (value: RankTier) => void;

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
  const classes = {
    trigger: trigger({ className }),
  };

  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(() => {
    return rankTierOptions.find((item) => item.value === defaultValue);
  }, [defaultValue]);

  const triggerValue = selectedOption ? (
    <span className="flex items-center gap-1.5">
      {selectedOption.icon}
      {selectedOption.label}
    </span>
  ) : undefined;

  const handleSelect = (value: string) => {
    onChange?.(value as RankTier);
    setOpen(false);
  };

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <Combobox.Trigger
        placeholder={placeholder}
        value={triggerValue}
        size={TriggerSize.base}
        className={classes.trigger}
        disabled={disabled}
      />
      <Combobox.Content className="w-full">
        <Combobox.Search placeholder="Search a rank tier" />
        <Combobox.List>
          <Combobox.Empty>No rank tiers found</Combobox.Empty>
          {rankTierOptions.map((item) => (
            <Combobox.Item className="p-1.5" key={item.value} value={item.value} onSelect={handleSelect}>
              {item.icon}
              {item.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
};
