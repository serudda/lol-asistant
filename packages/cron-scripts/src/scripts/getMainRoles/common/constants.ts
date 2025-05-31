import { LoLChampionRole } from '@lol-assistant/db';

export enum Sources {
  LEAGUE_OF_GRAPHS = 'leagueofgraphs',
}

export enum LeagueOfGraphsRole {
  top = 'TOP',
  jungle = 'JUNGLE',
  mid = 'MIDDLE',
  adc = 'ADC',
  support = 'SUPPORT',
}

// Mappers for League of Graphs to LoLChampionRole
export const toLoLChampionRole = (role: LeagueOfGraphsRole): LoLChampionRole => {
  switch (role) {
    case LeagueOfGraphsRole.top:
      return LoLChampionRole.top;
    case LeagueOfGraphsRole.jungle:
      return LoLChampionRole.jungle;
    case LeagueOfGraphsRole.mid:
      return LoLChampionRole.mid;
    case LeagueOfGraphsRole.adc:
      return LoLChampionRole.adc;
    case LeagueOfGraphsRole.support:
      return LoLChampionRole.support;
    default:
      throw new Error('[toLoLChampionRole] Unknown internal role:', role);
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
    [Sources.LEAGUE_OF_GRAPHS]: 'monkeyking',
  },
  nunuwillump: {
    [Sources.LEAGUE_OF_GRAPHS]: 'nunu',
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
