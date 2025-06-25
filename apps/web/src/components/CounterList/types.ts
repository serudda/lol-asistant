export type SourceStat = {
  slug: string; // e.g. 'mobalytics'
  name: string;
  logoUrl?: string;
  winRate: number;
  matches: number;
  sourceUrl?: string;
};

export type ChampionCounterRow = {
  rank: number;
  championName: string;
  championSlug: string;
  thumbnailUrl: string;
  role: string;
  rankTier: string;
  overallWinRate: number;
  totalMatches: string;
  sourceStats: Array<SourceStat>;
};
