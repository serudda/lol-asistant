import { normalizeStringToSlug } from '../../../../utils/helpers';
import { getChampionSlugForSource, Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';
import type { MobalyticsRank, MobalyticsRole } from './constants';
import { MOBALYTICS_BASE_URL } from './constants';
import type { MobalyticsCountersOptionsData } from './types';

export const mobalyticsApiCounterDto = (
  item: MobalyticsCountersOptionsData,
  rankTier: MobalyticsRank,
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

  // Some champions have different slugs depending on the data
  const sourceChampionSlug = getChampionSlugForSource(normalizeStringToSlug(item.matchupSlug), Sources.MOBALYTICS);

  return {
    rank: index + 1,
    sourceChampionSlug,
    champUrl: `${MOBALYTICS_BASE_URL}lol/champions/${sourceChampionSlug}/build/${lowerCaseRole}?rank=${rankTier}`,
    role: item.matchupRole,
    source: Sources.MOBALYTICS,
    sourceRankTier: rankTier,
    counterWinRate: parseFloat(winRate.toFixed(1)),
    matches: totalMatches,
  };
};
