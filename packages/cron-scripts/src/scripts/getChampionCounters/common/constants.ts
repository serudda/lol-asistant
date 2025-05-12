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

// Internal canonical enums
export enum InternalRole {
  TOP = 'top',
  JUNGLE = 'jungle',
  MID = 'mid',
  ADC = 'adc',
  SUPPORT = 'support',
}

// Keeping separate InternalRank enum to avoid uppercase mismatch with Prisma RankTier
// TODO: Refactor to use RankTier enum globally (see tech-debt ticket)
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
      throw new Error('[toMobalyticsRole] Unknown internal role:', role);
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
      throw new Error(`[toMobalyticsRank] Unknown internal rank: ${rank}`);
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
      throw new Error('[toOPGGRole] Unknown internal role:', role);
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
      throw new Error('[toOPGGRank] Unknown internal rank:', rank);
  }
};

// Mappers for U.GG
export const toUGGRole = (role: InternalRole): UGGRole => {
  switch (role) {
    case InternalRole.TOP:
      return UGGRole.TOP;
    case InternalRole.JUNGLE:
      return UGGRole.JUNGLE;
    case InternalRole.MID:
      return UGGRole.MID;
    case InternalRole.ADC:
      return UGGRole.ADC;
    case InternalRole.SUPPORT:
      return UGGRole.SUPPORT;
    default:
      throw new Error('[toUGGRole] Unknown internal role:', role);
  }
};

export const toUGGRank = (rank: InternalRank): UGGRank => {
  switch (rank) {
    case InternalRank.IRON:
      return UGGRank.IRON;
    case InternalRank.BRONZE:
      return UGGRank.BRONZE;
    case InternalRank.SILVER:
      return UGGRank.SILVER;
    case InternalRank.GOLD:
      return UGGRank.GOLD;
    case InternalRank.PLATINUM:
      return UGGRank.PLATINUM;
    case InternalRank.EMERALD:
      return UGGRank.EMERALD;
    case InternalRank.DIAMOND:
      return UGGRank.DIAMOND;
    case InternalRank.MASTER:
      return UGGRank.MASTER;
    case InternalRank.GRANDMASTER:
      return UGGRank.GRANDMASTER;
    case InternalRank.CHALLENGER:
      return UGGRank.CHALLENGER;
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
