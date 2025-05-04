import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { MobalyticsRank, MobalyticsRole } from './constants';
import { MOBALYTICS_BASE_URL } from './constants';
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

  if (totalMatches === 0) {
    throw new Error(
      `[mobalyticsApiCounterDto] Total matches is 0 for counter '${item.matchupSlug}' in role '${item.matchupRole}'.`,
    );
  }

  const winRate = (wins / totalMatches) * 100;
  const lowerCaseRole = role.toLowerCase();

  return {
    rank: index + 1,
    champion: item.matchupSlug,
    champUrl: `${MOBALYTICS_BASE_URL}lol/champions/${item.matchupSlug}/build/${lowerCaseRole}?rank=${rank}`,
    role: item.matchupRole,
    source: Sources.MOBALYTICS,
    counterWinRate: parseFloat(winRate.toFixed(1)),
    matches: totalMatches,
  };
};
