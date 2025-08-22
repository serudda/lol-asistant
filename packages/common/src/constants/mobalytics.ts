import { LoLChampionRole, RankTier } from '@lol-assistant/db';

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

// Mappers from LoLChampionRole to MobalyticsRole
export const toMobalyticsRole = (role: LoLChampionRole): MobalyticsRole => {
  switch (role) {
    case LoLChampionRole.top:
      return MobalyticsRole.TOP;
    case LoLChampionRole.jungle:
      return MobalyticsRole.JUNGLE;
    case LoLChampionRole.mid:
      return MobalyticsRole.MID;
    case LoLChampionRole.adc:
      return MobalyticsRole.ADC;
    case LoLChampionRole.support:
      return MobalyticsRole.SUPPORT;
    default:
      throw new Error('[toMobalyticsRole] Unknown internal role:', role);
  }
};

// Mappers from RankTier to MobalyticsRank
export const toMobalyticsRank = (rank: RankTier): MobalyticsRank => {
  switch (rank) {
    case RankTier.iron:
      return MobalyticsRank.iron;
    case RankTier.bronze:
      return MobalyticsRank.bronze;
    case RankTier.silver:
      return MobalyticsRank.silver;
    case RankTier.gold:
      return MobalyticsRank.gold;
    case RankTier.platinum:
      return MobalyticsRank.platinum;
    case RankTier.platinumPlus:
      return MobalyticsRank.platinumPlus;
    case RankTier.emerald:
      return MobalyticsRank.emerald;
    case RankTier.emeraldPlus:
      return MobalyticsRank.emeraldPlus;
    case RankTier.diamond:
      return MobalyticsRank.diamond;
    case RankTier.diamondPlus:
      return MobalyticsRank.diamondPlus;
    case RankTier.master:
      return MobalyticsRank.master;
    case RankTier.grandmaster:
      return MobalyticsRank.grandmaster;
    default:
      throw new Error(`[toMobalyticsRank] Unknown internal rank: ${rank}`);
  }
};
