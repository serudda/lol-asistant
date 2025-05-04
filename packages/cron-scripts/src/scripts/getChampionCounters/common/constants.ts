import { MobalyticsRank, MobalyticsRole } from '../mobalytics/common/constants';
import { OPGGRank, OPGGRole } from '../opgg/common/constants';

export enum Sources {
  MOBALYTICS = 'mobalytics',
  OP_GG = 'op.gg',
  U_GG = 'u.gg',
}

export const SourceUrls = {
  [Sources.MOBALYTICS]: 'https://mobalytics.gg',
  [Sources.OP_GG]: 'https://op.gg',
  [Sources.U_GG]: 'https://u.gg',
};

// Internal canonical enums
export enum InternalRole {
  TOP = 'top',
  JUNGLE = 'jungle',
  MID = 'mid',
  ADC = 'adc',
  SUPPORT = 'support',
}

export enum InternalRank {
  IRON = 'iron',
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  EMERALD = 'emerald',
  DIAMOND = 'diamond',
  MASTER = 'master',
  GRANDMASTER = 'grandmaster',
  CHALLENGER = 'challenger',
}

export const toMobalyticsRole = (role: InternalRole): MobalyticsRole => {
  switch (role) {
    case InternalRole.TOP:
      return MobalyticsRole.TOP;
    case InternalRole.JUNGLE:
      return MobalyticsRole.JUNGLE;
    case InternalRole.MID:
      return MobalyticsRole.MID;
    case InternalRole.ADC:
      return MobalyticsRole.ADC;
    case InternalRole.SUPPORT:
      return MobalyticsRole.SUPPORT;
    default:
      throw new Error('Unknown internal role:', role);
  }
};

export const toMobalyticsRank = (rank: InternalRank): MobalyticsRank => {
  switch (rank) {
    case InternalRank.IRON:
      return MobalyticsRank.IRON;
    case InternalRank.BRONZE:
      return MobalyticsRank.BRONZE;
    case InternalRank.SILVER:
      return MobalyticsRank.SILVER;
    case InternalRank.GOLD:
      return MobalyticsRank.GOLD;
    case InternalRank.PLATINUM:
      return MobalyticsRank.PLATINUM;
    case InternalRank.DIAMOND:
      return MobalyticsRank.DIAMOND;
    case InternalRank.MASTER:
      return MobalyticsRank.MASTER;
    case InternalRank.GRANDMASTER:
      return MobalyticsRank.GRANDMASTER;
    case InternalRank.CHALLENGER:
      return MobalyticsRank.CHALLENGER;
    default:
      throw new Error(`Unknown internal rank: ${rank}`);
  }
};

// Mappers for OP.GG
export const toOPGGRole = (role: InternalRole): OPGGRole => {
  switch (role) {
    case InternalRole.TOP:
      return OPGGRole.TOP;
    case InternalRole.JUNGLE:
      return OPGGRole.JUNGLE;
    case InternalRole.MID:
      return OPGGRole.MID;
    case InternalRole.ADC:
      return OPGGRole.ADC;
    case InternalRole.SUPPORT:
      return OPGGRole.SUPPORT;
    default:
      throw new Error('Unknown internal role:', role);
  }
};

export const toOPGGRank = (rank: InternalRank): OPGGRank => {
  switch (rank) {
    case InternalRank.IRON:
      return OPGGRank.IRON;
    case InternalRank.BRONZE:
      return OPGGRank.BRONZE;
    case InternalRank.SILVER:
      return OPGGRank.SILVER;
    case InternalRank.GOLD:
      return OPGGRank.GOLD;
    case InternalRank.PLATINUM:
      return OPGGRank.PLATINUM;
    case InternalRank.EMERALD:
      return OPGGRank.EMERALD;
    case InternalRank.DIAMOND:
      return OPGGRank.DIAMOND;
    case InternalRank.MASTER:
      return OPGGRank.MASTER;
    case InternalRank.GRANDMASTER:
      return OPGGRank.GRANDMASTER;
    case InternalRank.CHALLENGER:
      return OPGGRank.CHALLENGER;
    default:
      throw new Error('Unknown internal rank:', rank);
  }
};
