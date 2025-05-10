import { normalizeStringToSlug } from '../../../../utils/helpers';
import { getChampionSlugForSource, Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { UGGRank } from './constants';
import { U_GG_CHAMPION_URL } from './constants';
import type { UGGCounterOptionsData } from './types';

export const uggChampCounterDto = (item: UGGCounterOptionsData, rank: UGGRank, id: number): SourceCounter => {
  // Some champions have different slugs depending on the data
  const sourceChampionSlug = getChampionSlugForSource(normalizeStringToSlug(item.champion), Sources.U_GG);

  return {
    rank: id,
    sourceChampionSlug,
    champUrl: `${U_GG_CHAMPION_URL}/${sourceChampionSlug}/build/${item.role.toLowerCase()}?rank=${rank}`,
    role: item.role,
    source: Sources.U_GG,
    counterWinRate: parseFloat(item.counterWinRate),
    matches: item.matches,
  };
};
