export type SourceStat = {
  slug: string; // e.g. 'mobalytics'
  name: string;
  iconUrl?: string;
  winRate: number;
  matches: number;
  sourceUrl?: string;
};

export type ChampionCounterRow = {
  rank: number;
  champion: string;
  imageUrl: string;
  role: string;
  rankTier: string;
  overallWinRate: string;
  totalMatches: string;
  sourceStats: Array<SourceStat>;
};
