/**
 * Represents the result of a sync operation for a champion.
 */
export interface SyncChampionResult {
  total: number;
  success: number;
  failed: Array<{
    slug: string;
    error: string;
    attempts: number;
  }>;
}
