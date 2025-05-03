import * as React from 'react';
import { ChampionCombobox } from '../components';

export const PickChampPage: React.FC = () => {
  const [value, setValue] = React.useState('');

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Pick a Champ</h1>

      <div className="w-full max-w-md mx-auto">
        <ChampionCombobox defaultValue={value} onChange={setValue} />
      </div>
    </div>
  );
};
