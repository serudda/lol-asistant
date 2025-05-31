import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { Sources, SourceUrls } from './constants';

export const U_GG_CHAMPION_URL = `${SourceUrls[Sources.U_GG]}/lol/champions`;

export enum UGGRank {
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

export enum UGGRole {
  top = 'top',
  jungle = 'jungle',
  mid = 'mid',
  adc = 'adc',
  support = 'support',
}

// Mappers from LoLChampionRole to UGGRole
export const toUGGRole = (role: LoLChampionRole): UGGRole => {
  switch (role) {
    case LoLChampionRole.top:
      return UGGRole.top;
    case LoLChampionRole.jungle:
      return UGGRole.jungle;
    case LoLChampionRole.mid:
      return UGGRole.mid;
    case LoLChampionRole.adc:
      return UGGRole.adc;
    case LoLChampionRole.support:
      return UGGRole.support;
    default:
      throw new Error('[toUGGRole] Unknown internal role:', role);
  }
};

// Mappers from RankTier to UGGRank
export const toUGGRank = (rank: RankTier): UGGRank => {
  switch (rank) {
    case RankTier.iron:
      return UGGRank.iron;
    case RankTier.bronze:
      return UGGRank.bronze;
    case RankTier.silver:
      return UGGRank.silver;
    case RankTier.gold:
      return UGGRank.gold;
    case RankTier.platinum:
      return UGGRank.platinum;
    case RankTier.platinumPlus:
      return UGGRank.platinumPlus;
    case RankTier.emerald:
      return UGGRank.emerald;
    case RankTier.emeraldPlus:
      return UGGRank.emeraldPlus;
    case RankTier.diamond:
      return UGGRank.diamond;
    case RankTier.diamondPlus:
      return UGGRank.diamondPlus;
    case RankTier.master:
      return UGGRank.master;
    case RankTier.grandmaster:
      return UGGRank.grandmaster;
    case RankTier.challenger:
      return UGGRank.challenger;
    default:
      throw new Error('[toUGGRank] Unknown internal rank:', rank);
  }
};
