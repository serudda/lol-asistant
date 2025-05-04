import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { MobalyticsRank, MobalyticsRole } from './constants';
import type { MobalyticsCountersOptionsData } from './types';

export const mobalyticsApiCounterDto = (
  item: MobalyticsCountersOptionsData,
  rank: MobalyticsRank,
  role: MobalyticsRole,
  index: number,
): SourceCounter => {
  const wins = item.counterMetrics?.wins ?? 0;
  const looses = item.counterMetrics?.looses ?? 0;
  const totalMatches = wins + looses;
  const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : null;
  const lowerCaseRole = role.toLowerCase();

  return {
    rank: index + 1,
    champion: item.matchupSlug,
    champUrl: `https://mobalytics.gg/lol/champions/${item.matchupSlug}/build/${lowerCaseRole}?rank=${rank}`,
    role: item.matchupRole,
    source: Sources.MOBALYTICS,
    counterWinRate: winRate ? parseFloat(winRate.toFixed(1)) : null,
    matches: totalMatches,
  };
};
