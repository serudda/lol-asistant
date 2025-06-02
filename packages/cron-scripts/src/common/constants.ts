export enum Sources {
  MOBALYTICS = 'mobalytics',
  OP_GG = 'op.gg',
  U_GG = 'u.gg',
  LEAGUE_OF_GRAPHS = 'leagueofgraphs',
}

export const SourceUrls = {
  [Sources.MOBALYTICS]: 'https://mobalytics.gg',
  [Sources.OP_GG]: 'https://op.gg',
  [Sources.U_GG]: 'https://u.gg',
  [Sources.LEAGUE_OF_GRAPHS]: 'https://www.leagueofgraphs.com',
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
    [Sources.LEAGUE_OF_GRAPHS]: 'monkeyking',
  },
  nunuwillump: {
    [Sources.U_GG]: 'nunu',
    [Sources.OP_GG]: 'nunu',
    [Sources.MOBALYTICS]: 'nunu',
    [Sources.LEAGUE_OF_GRAPHS]: 'nunu',
  },
  renataglasc: {
    [Sources.MOBALYTICS]: 'renata',
    [Sources.OP_GG]: 'renata',
    [Sources.U_GG]: 'renata',
    [Sources.LEAGUE_OF_GRAPHS]: 'renata',
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
