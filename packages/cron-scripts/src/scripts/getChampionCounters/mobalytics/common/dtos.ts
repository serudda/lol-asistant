import { Sources } from '../../common/constants';
import type { SourceCounter } from '../../common/types';

export const mobalyticsApiCounterDto = (item: any, idx: number): SourceCounter => {
  const wins = item.counterMetrics?.wins ?? 0;
  const looses = item.counterMetrics?.looses ?? 0;
  const totalMatches = wins + looses;
  const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : null;

  return {
    rank: idx + 1,
    champion: item.matchupSlug,
    champUrl: '',
    role: item.matchupRole,
    source: Sources.MOBALYTICS,
    counterWinRate: winRate ? parseFloat(winRate.toFixed(2)) : null,
    matches: totalMatches,
  };
};
