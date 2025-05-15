import * as React from 'react';
import { Combobox, TriggerSize } from '@lol-assistant/ui';
import { trpc } from '../../utils/api';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: '',
});

export interface PatchComboboxOption {
  value: string;
  label: string;
}

interface PatchComboboxProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The default value of the combobox.
   */
  defaultValue?: string;

  /**
   * The function to call when the value changes.
   */
  onChange: (value: string) => void;

  /**
   * Whether the combobox is disabled.
   */
  disabled?: boolean;
}

/**
 * A combobox for selecting a patch.
 */
export const PatchCombobox = ({ defaultValue, disabled = false, className = '', onChange }: PatchComboboxProps) => {
  const classes = {
    trigger: trigger({ className }),
  };

  const [open, setOpen] = React.useState(false);

  const { data: patchNotes } = trpc.patchNote.getLastTwo.useQuery({});

  const options: Array<PatchComboboxOption> = React.useMemo(() => {
    if (!patchNotes?.result?.patchNotes) return [];
    return patchNotes.result.patchNotes.map((patch) => ({
      value: patch.patchVersion,
      label: patch.patchVersion,
    }));
  }, [patchNotes]);

  const selectedOption = React.useMemo(() => {
    if (!defaultValue) return options[0];
    return options.find((option) => option.value === defaultValue);
  }, [defaultValue, options]);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setOpen(false);
  };

  return (
    <Combobox open={open} onOpenChange={setOpen}>
      <Combobox.Trigger
        value={selectedOption?.label}
        size={TriggerSize.base}
        className={classes.trigger}
        disabled={disabled}
      />
      <Combobox.Content className="w-full">
        <Combobox.List>
          <Combobox.Empty>No patches found</Combobox.Empty>
          {options.map((item) => (
            <Combobox.Item key={item.value} value={item.value} onSelect={handleSelect}>
              {item.label}
            </Combobox.Item>
          ))}
        </Combobox.List>
      </Combobox.Content>
    </Combobox>
  );
};
