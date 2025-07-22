export interface MobalyticsCountersOptionsData {
  aId: string;
  matchupSlug: string;
  matchupRole: string;
  counterMetrics: {
    wins: number;
    looses: number;
    matchupDelta: number;
    csd15: number;
    gd15: number;
    xpd15: number;
    firstToLevel2: number;
    jungle_csd15: number;
    neutralObjectivePercent: number;
    adc_csd15: number;
    adc_gd15: number;
    adc_xpd15: number;
    itemCompletionDiff: number;
  };
}
