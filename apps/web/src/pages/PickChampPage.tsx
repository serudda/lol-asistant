import React, { useMemo, useState } from 'react';
import { Combobox, TriggerSize } from '@lol-assistant/ui';

const champions = [
  { value: 'Aatrox', label: 'Aatrox' },
  { value: 'Ahri', label: 'Ahri' },
  { value: 'Akali', label: 'Akali' },
  { value: 'Akshan', label: 'Akshan' },
];

export const PickChampPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const getLabel = useMemo(() => {
    return champions.find((champ) => champ.value === value)?.label;
  }, [value]);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Pick a Champ</h1>

      <div className="w-full max-w-md mx-auto">
        <Combobox open={open} onOpenChange={setOpen}>
          <Combobox.Trigger placeholder="Select a champion" value={getLabel} size={TriggerSize.lg} className="w-full" />
          <Combobox.Content className="w-full">
            <Combobox.Search placeholder="Search a champion" />
            <Combobox.List>
              <Combobox.Empty>No champions found</Combobox.Empty>
              {champions.map((champion) => (
                <Combobox.Item
                  key={champion.value}
                  value={champion.value}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {champion.label}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Content>
        </Combobox>
      </div>
    </div>
  );
};
