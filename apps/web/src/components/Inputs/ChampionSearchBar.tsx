import * as React from 'react';
import { Avatar, AvatarSize, Combobox, TriggerSize, type TriggerSizeType } from '@lol-assistant/ui';
import { trpc } from '../../utils/api';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: ['w-full'],
});

export interface ChampionSearchBarOption {
  value: string;
  label: string;
  thumbnailUrl?: string | null;
}

interface ChampionSearchBarProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The value of the champion.
   */
  defaultValue: string;

  /**
   * The size of the combobox.
   */
  size?: TriggerSizeType;

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
 * A search bar for selecting a Champion.
 */
export const ChampionSearchBar = ({
  defaultValue,
  onChange,
  placeholder = 'Select a champion',
  size = TriggerSize.xl,
  disabled = false,
  className = '',
}: ChampionSearchBarProps) => {
  const classes = trigger({ className });
  const { data } = trpc.champion.getAllBasic.useQuery({});
  const [open, setOpen] = React.useState(false);

  const options: Array<ChampionSearchBarOption> = React.useMemo(() => {
    if (!data?.result?.champions) return [];
    return data.result.champions.map((champ) => ({
      value: champ.slug,
      label: champ.name,
      thumbnailUrl: champ.thumbnailUrl,
    }));
  }, [data]);

  const selectedOption = React.useMemo(() => {
    return options.find((item) => item.value === defaultValue);
  }, [defaultValue, options]);

  const triggerValue = selectedOption ? (
    <span className="flex items-center gap-2">
      <Avatar size={AvatarSize.sm}>
        <Avatar.Image src={selectedOption.thumbnailUrl as string} />
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
        size={size}
        className={classes}
        disabled={disabled}
        isRounded
      />
      <Combobox.Content className="w-full">
        <Combobox.Search placeholder="Search a champion" />
        <Combobox.List>
          <Combobox.Empty>No champions found</Combobox.Empty>
          {options.map((item) => (
            <Combobox.Item key={item.value} value={item.value} onSelect={handleSelect}>
              <Avatar size={AvatarSize.sm}>
                <Avatar.Image src={item.thumbnailUrl as string} />
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
