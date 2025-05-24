import type { SourceMatchupStat } from '@lol-assistant/db';

const PENALTY_FACTOR = 0.7; // (configurable)

/**
 * Calculates the weighted win rate and total matches for a
 * champion matchup, applying a penalty if only one source
 * is present and the number of matches is below the
 * median.
 *
 * @param sourceStats Array of source stats ({ winRate,
 *   matches })
 * @param allMatchupsTotalMatches Array of totalMatches for
 *   all matchups (for this champion/role/tier/patch)
 * @returns {weightedWinRate: number, totalMatches: number}
 */
export const calculateWeightedWinRateWithPenalty = (
  sourceStats: Array<SourceMatchupStat>,
  allMatchupsTotalMatches: Array<number>,
): { weightedWinRate: number; totalMatches: number } => {
  // Check if there are any source stats
  if (sourceStats.length === 0) return { weightedWinRate: 0, totalMatches: 0 };

  // Calculate weighted win rate
  const totalMatches = sourceStats.reduce((sum, s) => sum + s.matches, 0);
  let weightedWinRate = 0;
  if (totalMatches > 0) {
    const weightedSum = sourceStats.reduce((sum, s) => sum + s.winRate * s.matches, 0);
    weightedWinRate = weightedSum / totalMatches;
  }

  // Calculate median
  let medianMatches = 0;
  const sorted = [...allMatchupsTotalMatches].sort((a, b) => a - b);
  const n = sorted.length;
  if (n > 0) {
    const mid = Math.floor(n / 2);
    if (n % 2 !== 0) medianMatches = sorted[mid];
    else medianMatches = (sorted[mid - 1] + sorted[mid]) / 2;
  }

  // Apply penalty if only one source and matches < median
  if (sourceStats.length === 1 && totalMatches < medianMatches) {
    weightedWinRate *= PENALTY_FACTOR;
  }
  return { weightedWinRate, totalMatches };
};
