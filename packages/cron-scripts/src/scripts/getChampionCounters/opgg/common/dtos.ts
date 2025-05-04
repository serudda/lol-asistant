import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { OPGGRank } from './constants';
import { OPGG_BASE_URL } from './constants';
import type { OPGGCountersOptionsData } from './types';

export const opggChampCounterDto = (item: OPGGCountersOptionsData, rank: OPGGRank, id: number): SourceCounter => {
  const counterWinRate = parseFloat(item.counterWinRate);

  if (!counterWinRate) {
    throw new Error(
      `[opggChampCounterDto] Could not extract winrate for counter '${item.matchupSlug}' in role '${item.matchupRole}'. Element HTML: ${item.counterWinRate}`,
    );
  }

  if (isNaN(counterWinRate)) {
    throw new Error(
      `[opggChampCounterDto] Parsed winrate is NaN for counter '${item.matchupSlug}' in role '${item.matchupRole}'. Raw text: '${item.counterWinRate}'`,
    );
  }

  return {
    rank: id,
    champion: item.matchupSlug,
    champUrl: `${OPGG_BASE_URL}/lol/champions/${item.matchupSlug}/build/${item.matchupRole.toLowerCase()}?tier=${rank}`,
    role: item.matchupRole,
    source: Sources.OP_GG,
    counterWinRate: 100 - parseFloat(item.counterWinRate), // op.gg shows winrate inverted, so we invert it
    matches: item.games,
  };
};
