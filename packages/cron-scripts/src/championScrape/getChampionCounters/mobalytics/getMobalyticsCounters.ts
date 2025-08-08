import type { MobalyticsRank, MobalyticsRole } from '../../../common';
import type { SourceCounter } from '../common/types';
import { mobalyticsApiCounterDto } from './common/dtos';
import { fetchMobalyticsCounters } from './common/fetchMobalyticsApi';
import type { MobalyticsCountersOptionsData } from './common/types';

async function fetchAllMobalyticsCounters(
  slug: string,
  role: MobalyticsRole,
  rank: MobalyticsRank,
): Promise<Array<MobalyticsCountersOptionsData>> {
  const allOptions: Array<MobalyticsCountersOptionsData> = [];
  const pageSize = 50;
  let skip = 0;
  let keepFetching = true;

  while (keepFetching) {
    const response = await fetchMobalyticsCounters(slug, role, rank, pageSize, skip);
    const options = response || [];
    allOptions.push(...options);

    // If we have less than the page size, we've reached the end
    if (options.length < pageSize) {
      keepFetching = false;
    } else {
      skip += pageSize;
    }
  }
  return allOptions;
}

/**
 * Get champion data from Mobalytics API for a specific
 * champion and version.
 *
 * @param slug - The slug of the champion. e.g. 'ahri'
 * @param role - The role of the champion. e.g. 'MID'
 * @param rank - The rank of the champion. e.g. 'Iron'
 */
export const getMobalyticsCounters = async (
  slug: string,
  role: MobalyticsRole,
  rank: MobalyticsRank,
): Promise<Array<SourceCounter>> => {
  try {
    // Fetch all raw counters from Mobalytics API
    console.log(`[getMobalyticsCounters] Fetching counters for: ${slug} (${role}, ${rank})`);
    const rawCounters = await fetchAllMobalyticsCounters(slug, role, rank);

    // Map to DTO format
    const counters: Array<SourceCounter> = rawCounters.map((item, index) =>
      mobalyticsApiCounterDto(item, rank, role, index),
    );
    console.log(`[getMobalyticsCounters] Extracted ${counters.length} counters.`);

    return counters;
  } catch (error) {
    console.error(`[getMobalyticsCounters] Failed to fetch or parse counters:`, error);
    throw error;
  }
};
