import * as React from 'react';
import { Avatar, AvatarSize, Combobox, TriggerSize } from '@lol-assistant/ui';
import { Asterisk } from 'lucide-react';
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'pl-2',
});

export interface ChampionFilterOption {
  value: string;
  label: string;
  imageUrl?: string | null;
}

interface ChampionFilterProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The value of the champion.
   */
  defaultValue: string;

  /**
   * The options of the combobox.
   */
  options: Array<ChampionFilterOption>;

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
 * This.
 */
export const ChampionFilter = ({
  defaultValue,
  options = [],
  onChange,
  placeholder = 'All champions',
  disabled = false,
  className = '',
}: ChampionFilterProps) => {
  const classes = input({
    className,
  });

  const [open, setOpen] = React.useState(false);

  const selectedOption = React.useMemo(() => {
    return options.find((item) => item.value === defaultValue);
  }, [defaultValue, options]);

  const triggerValue = selectedOption ? (
    <span className="flex items-center gap-2">
      <Avatar size={AvatarSize.xs}>
        <Avatar.Image src={selectedOption.imageUrl as string} />
      </Avatar>
      {selectedOption.label}
    </span>
  ) : undefined;

  const handleSelect = (slug: string) => {
    onChange?.(slug);
    setOpen(false);
  };

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <Combobox.Trigger
        placeholder={placeholder}
        value={triggerValue}
        size={TriggerSize.base}
        className={classes}
        disabled={disabled}
      />
      <Combobox.Content className="w-full">
        <Combobox.Search placeholder="Search a champion" />
        <Combobox.List>
          <Combobox.Empty>No champions found</Combobox.Empty>
          <Combobox.Item value="" onSelect={handleSelect}>
            <Asterisk className="size-6" />
            All champions
          </Combobox.Item>
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
