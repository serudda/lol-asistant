export const MOBALYTICS_BASE_URL = 'https://mobalytics.gg/';
export const MOBALYTICS_ENDPOINT = `${MOBALYTICS_BASE_URL}api/lol/graphql/v1/query`;

export enum MobalyticsRank {
  iron = 'Iron',
  bronze = 'Bronze',
  silver = 'Silver',
  gold = 'Gold',
  platinum = 'Platinum',
  platinumPlus = 'Platinum+',
  emerald = 'Emerald',
  emeraldPlus = 'Emerald+',
  diamond = 'Diamond',
  diamondPlus = 'Diamond+',
  diamondTwoPlus = 'Diamond2+',
  master = 'Master',
  masterPlus = 'Master+',
  grandmaster = 'Grandmaster',
}

export enum MobalyticsRole {
  TOP = 'TOP',
  JUNGLE = 'JUNGLE',
  MID = 'MID',
  ADC = 'ADC',
  SUPPORT = 'SUPPORT',
}
