import * as React from 'react';
import { ChampionCombobox } from '../components';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [value, setValue] = React.useState('');

  const { data: countersData } = trpc.championMatchup.getChampionCounters.useQuery({
    baseChampionId: value,
  });

  console.log(countersData);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Pick a Champ</h1>

      <div className="w-full max-w-md mx-auto">
        <ChampionCombobox defaultValue={value} onChange={setValue} />
      </div>
    </div>
  );
};
