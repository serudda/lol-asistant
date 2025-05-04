export const OPGG_BASE_URL = 'https://www.op.gg';
export const OPGG_CHAMPION_URL = `${OPGG_BASE_URL}/champions`;

export enum OPGGRank {
  IRON = 'iron',
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  GOLD_PLUS = 'gold_plus',
  PLATINUM = 'platinum',
  PLATINUM_PLUS = 'platinum_plus',
  EMERALD = 'emerald',
  EMERALD_PLUS = 'emerald_plus',
  DIAMOND = 'diamond',
  DIAMOND_PLUS = 'diamond_plus',
  MASTER = 'master',
  MASTER_PLUS = 'master_plus',
  GRANDMASTER = 'grandmaster',
  CHALLENGER = 'challenger',
}

export enum OPGGRole {
  TOP = 'top',
  JUNGLE = 'jungle',
  MID = 'mid',
  ADC = 'adc',
  SUPPORT = 'support',
}
