import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { MobalyticsRank, MobalyticsRole } from '../mobalytics/common/constants';
import { OPGGRank, OPGGRole } from '../opgg/common/constants';
import { UGGRank, UGGRole } from '../ugg/common/constants';

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

// Mappers for OP.GG
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

// Mappers for U.GG
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

/**
 * Some champions have different slugs depending on the data
 * source we are scraping. This map stores the exceptions so
 * that we can consistently work with our canonical slug
 * (key) while still being able to generate / consume the
 * slug required by each external provider.
 */
export const ChampionSlugOverrides: Record<string, Partial<Record<Sources, string>>> = {
  // Wukong is exposed as "monkeyking" on Mobalytics and OP.GG, but as "wukong" internally & on U.GG
  wukong: {
    [Sources.MOBALYTICS]: 'monkeyking',
    [Sources.OP_GG]: 'monkeyking',
  },
  nunuwillump: {
    [Sources.U_GG]: 'nunu',
    [Sources.OP_GG]: 'nunu',
    [Sources.MOBALYTICS]: 'nunu',
  },
};

/**
 * Translate a canonical champion slug (internal) to the
 * slug expected by an external data provider.
 */
export const getChampionSlugForSource = (internalSlug: string, source: Sources): string => {
  return ChampionSlugOverrides[internalSlug]?.[source] ?? internalSlug;
};

/**
 * Translate a champion slug coming from an external
 * provider to the canonical slug we use internally.
 */
export const normalizeChampionSlugFromSource = (sourceSlug: string, source: Sources): string => {
  for (const [internalSlug, overrides] of Object.entries(ChampionSlugOverrides)) {
    if (overrides?.[source] && overrides[source] === sourceSlug) {
      return internalSlug;
    }
  }
  return sourceSlug; // fall-back: already canonical
};
