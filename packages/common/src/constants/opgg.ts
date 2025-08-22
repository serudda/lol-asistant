import { LoLChampionRole, RankTier } from '@lol-assistant/db';

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

// Mappers from LoLChampionRole to OPGGRole
export const toOPGGRole = (role: LoLChampionRole): OPGGRole => {
  switch (role) {
    case LoLChampionRole.top:
      return OPGGRole.top;
    case LoLChampionRole.jungle:
      return OPGGRole.jungle;
    case LoLChampionRole.mid:
      return OPGGRole.mid;
    case LoLChampionRole.adc:
      return OPGGRole.adc;
    case LoLChampionRole.support:
      return OPGGRole.support;
    default:
      throw new Error('[toOPGGRole] Unknown internal role:', role);
  }
};

// Mappers from RankTier to OPGGRank
export const toOPGGRank = (rank: RankTier): OPGGRank => {
  switch (rank) {
    case RankTier.iron:
      return OPGGRank.iron;
    case RankTier.bronze:
      return OPGGRank.bronze;
    case RankTier.silver:
      return OPGGRank.silver;
    case RankTier.gold:
      return OPGGRank.gold;
    case RankTier.platinum:
      return OPGGRank.platinum;
    case RankTier.platinumPlus:
      return OPGGRank.platinumPlus;
    case RankTier.emerald:
      return OPGGRank.emerald;
    case RankTier.emeraldPlus:
      return OPGGRank.emeraldPlus;
    case RankTier.diamond:
      return OPGGRank.diamond;
    case RankTier.diamondPlus:
      return OPGGRank.diamondPlus;
    case RankTier.master:
      return OPGGRank.master;
    case RankTier.grandmaster:
      return OPGGRank.grandmaster;
    case RankTier.challenger:
      return OPGGRank.challenger;
    default:
      throw new Error('[toOPGGRank] Unknown internal rank:', rank);
  }
};
