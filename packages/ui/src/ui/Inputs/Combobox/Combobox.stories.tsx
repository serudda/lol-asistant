import { useMemo, useState } from 'react';
import { Button, ButtonSize } from '../../Button/Button';
import { Combobox, TriggerSize } from './Combobox';
import type { Meta, StoryObj } from '@storybook/react';
import { Check } from 'lucide-react';
import { tv } from 'tailwind-variants';

const check = tv({
  base: 'mr-2 h-4 w-4',
  variants: {
    isSelected: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
});

const modalities = [
  {
    value: 'garen',
    label: 'Garen',
  },
  {
    value: 'katarina',
    label: 'Katarina',
  },
  {
    value: 'jinx',
    label: 'Jinx',
  },
  {
    value: 'lucian',
    label: 'Lucian',
  },
  {
    value: 'kassadin',
    label: 'Kassadin',
  },
  {
    value: 'gwen',
    label: 'Gwen',
  },
  {
    value: 'morgana',
    label: 'Morgana',
  },
  {
    value: 'trundle',
    label: 'Trundle',
  },
  {
    value: 'thresh',
    label: 'Thresh',
  },
];

const meta = {
  title: 'UI Components/Inputs/Combobox',
  component: Combobox,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '',
  },
  render: function Render() {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);

    const getLabel = useMemo(() => {
      return modalities.find((modality) => modality.value === value)?.label;
    }, [value]);

    return (
      <div className="flex w-[500px] gap-2">
        <Combobox open={open} onOpenChange={setOpen}>
          <Combobox.Trigger placeholder="Select a champion" value={getLabel} size={TriggerSize.lg} />
          <Combobox.Content>
            <Combobox.Search placeholder="Search a champion" />
            <Combobox.List>
              <Combobox.Empty>No champions found</Combobox.Empty>
              {modalities.map((modality) => (
                <Combobox.Item
                  key={modality.value}
                  value={modality.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={check({ isSelected: value === modality.value })} />
                  {modality.label}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
        <Button size={ButtonSize.lg}>Save</Button>
      </div>
    );
  },
};
