import * as React from 'react';
import { Avatar, AvatarSize } from '@lol-assistant/ui';
import { ChampionCombobox } from '../components';
import { trpc } from '../utils/api';

export const PickChampPage: React.FC = () => {
  const [value, setValue] = React.useState('');

  const { data: countersData } = trpc.championMatchup.getChampionCounters.useQuery({
    baseChampionId: value,
  });

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-8">Pick a Champ</h1>

      <div className="w-full max-w-md mx-auto">
        <ChampionCombobox defaultValue={value} onChange={setValue} />
      </div>

      {countersData && (
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Counters</h2>
          <table>
            <thead>
              <tr>
                <th>Champion</th>
                <th>Role</th>
                <th>Rank Tier</th>
                <th>Weighted Win Rate</th>
                <th>Total Matches</th>
              </tr>
            </thead>
            <tbody>
              {countersData?.result?.counters?.map((counter) => (
                <tr key={counter.opponentChampion.id}>
                  <td className="flex items-center gap-2">
                    <Avatar size={AvatarSize.sm} isRounded>
                      <Avatar.Image src={counter.opponentChampion.imageUrl as string} />
                      <Avatar.Fallback>{counter.opponentChampion.name.slice(0, 2)}</Avatar.Fallback>
                    </Avatar>
                    {counter.opponentChampion.name}
                  </td>
                  <td>{counter.role}</td>
                  <td>{counter.rankTier}</td>
                  <td>{counter.weightedWinRate}</td>
                  <td>{counter.totalMatches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
