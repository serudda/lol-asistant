import { useMemo, useState } from 'react';
import { Combobox } from './Combobox';
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
    value: 'mri',
    label: 'MRI - Resonancia Magnética',
  },
  {
    value: 'ct',
    label: 'CT - Tomografía Computarizada',
  },
  {
    value: 'ultrasound',
    label: 'Ultrasónido',
  },
  {
    value: 'radiography',
    label: 'Radiografía',
  },
  {
    value: 'pet',
    label: 'PET - Tomografía Computarizada por Emisión de Positrones',
  },
  {
    value: 'msct',
    label: 'MSCT - Tomografía Computarizada multicapa',
  },
  {
    value: 'mammography',
    label: 'Mamografía',
  },
  {
    value: 'ctre',
    label: 'CTR - Tomografía Computarizada por Resonancia',
  },
  {
    value: 'tr',
    label: 'TR - Tomografía por Reflexión',
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
      <Combobox open={open} onOpenChange={setOpen}>
        <Combobox.Trigger isActive={open} placeholder="Selecciona una Modalidad" value={getLabel} />
        <Combobox.Content>
          <Combobox.Search placeholder="Busca una Modalidad" />
          <Combobox.List>
            <Combobox.Empty>No se encontraron resultados</Combobox.Empty>
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
    );
  },
};
