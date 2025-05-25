export const MatchupsOverviewCardGroup = {
  easiest: 'easiest',
  hardest: 'hardest',
} as const;
export type MatchupsOverviewCardGroupType = (typeof MatchupsOverviewCardGroup)[keyof typeof MatchupsOverviewCardGroup];
