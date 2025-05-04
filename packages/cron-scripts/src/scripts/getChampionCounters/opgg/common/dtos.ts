import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { OPGGRank } from './constants';
import { OPGG_BASE_URL } from './constants';
import type { OPGGCountersOptionsData } from './types';

export const opggChampCounterDto = (item: OPGGCountersOptionsData, rank: OPGGRank, id: number): SourceCounter => {
  return {
    rank: id,
    champion: item.matchupSlug,
    champUrl: `${OPGG_BASE_URL}/lol/champions/${item.matchupSlug}/build/${item.matchupRole.toLowerCase()}?tier=${rank}`,
    role: item.matchupRole,
    source: Sources.OP_GG,
    counterWinRate: 100 - item.counterWinRate,
    matches: item.games,
  };
};
