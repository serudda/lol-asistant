export const OPGG_BASE_URL = 'https://www.op.gg';
export const OPGG_CHAMPION_URL = `${OPGG_BASE_URL}/lol/champions`;

export enum OPGGRank {
  iron = 'iron',
  bronze = 'bronze',
  silver = 'silver',
  gold = 'gold',
  goldPlus = 'gold_plus',
  platinum = 'platinum',
  platinumPlus = 'platinum_plus',
  emerald = 'emerald',
  emeraldPlus = 'emerald_plus',
  diamond = 'diamond',
  diamondPlus = 'diamond_plus',
  master = 'master',
  masterPlus = 'master_plus',
  grandmaster = 'grandmaster',
  challenger = 'challenger',
}

export enum OPGGRole {
  top = 'top',
  jungle = 'jungle',
  mid = 'mid',
  adc = 'adc',
  support = 'support',
}
