import type { MobalyticsRank, MobalyticsRole } from './constants';
import { MOBALYTICS_ENDPOINT } from './constants';
import type { MobalyticsCountersOptionsData } from './types';
import axios from 'axios';

/**
 * Fetch Mobalytics counters for a given champion slug,
 * role, rank, top, and skip.
 *
 * @param slug - The slug of the champion to fetch counters
 *   for. e.g. 'ahri'
 * @param role - The role to fetch counters for. e.g. 'MID'
 * @param rank - The rank to fetch counters for. e.g. 'Iron'
 */
export const fetchMobalyticsCounters = async (
  slug: string,
  role: MobalyticsRole,
  rank: MobalyticsRank,
  top = 10,
  skip = 0,
) => {
  const payload = {
    operationName: 'LolChampionCountersStatsOptionsQuery',
    variables: {
      top,
      slug,
      role,
      patch: null,
      queue: null,
      rank,
      region: null,
      counterVsChampionSlug: null,
      vsChampionRole: null,
      sortField: 'WR',
      order: 'DESC',
      skip,
    },
    extensions: {
      persistedQuery: {
        version: 1,
        sha256Hash: 'ead4a46f348fcf885b9e7a28680d9bf4f64e37c7d884f498e494139703958acd',
      },
    },
  };

  const res = await axios.post(MOBALYTICS_ENDPOINT, payload, {
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    },
  });

  if (res.status !== 200) {
    console.error(`Failed to fetch Mobalytics counters for ${slug}`);
    throw new Error(`Failed to fetch Mobalytics counters for ${slug}`);
  }

  return res.data?.data?.lol?.champion?.countersOptions?.options as Array<MobalyticsCountersOptionsData>;
};
