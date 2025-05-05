import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { UGGRank } from './constants';
import { U_GG_CHAMPION_URL } from './constants';
import type { UGGCounterOptionsData } from './types';

export const uggChampCounterDto = (item: UGGCounterOptionsData, rank: UGGRank, id: number): SourceCounter => {
  return {
    rank: id,
    champion: item.champion,
    champUrl: `${U_GG_CHAMPION_URL}/${item.champion}/build/${item.role.toLowerCase()}?rank=${rank}`,
    role: item.role,
    source: Sources.U_GG,
    counterWinRate: parseFloat(item.counterWinRate),
    matches: item.matches,
  };
};
