import { ResponseStatus } from '@lol-assistant/api/src/common/constants';
import { createClient } from '../../../utils/trpc-client';
import type { InternalRole } from './constants';

/**
 * Centralized function to get or create a ChampionMatchup
 * by slugs and patch version.
 *
 * @param params - Object with baseChampionSlug,
 *   opponentChampionSlug, patchVersion, role.
 * @returns championMatchupId (string)
 */
export const createChampionMatchup = async ({
  baseChampionSlug,
  opponentChampionSlug,
  patchVersion,
  role,
}: {
  baseChampionSlug: string;
  opponentChampionSlug: string;
  patchVersion: string;
  role: InternalRole;
}): Promise<string> => {
  try {
    console.log(
      `[createChampionMatchup] - Creating champion matchup for base champion '${baseChampionSlug}' and opponent champion '${opponentChampionSlug}'...`,
    );

    // Use the centralized TRPC client
    const client = createClient();

    // Get base champion by slug
    const baseChampionResp = await client.champion.getBySlug.query({ slug: baseChampionSlug });
    if (!baseChampionResp.result.champion) {
      throw new Error(`[createChampionMatchup] Base champion not found: ${baseChampionSlug}`);
    }

    // Get opponent champion by slug
    const opponentChampionResp = await client.champion.getBySlug.query({ slug: opponentChampionSlug });
    if (!opponentChampionResp.result.champion) {
      throw new Error(`[createChampionMatchup] Opponent champion not found: ${opponentChampionSlug}`);
    }

    // Get patch note by version
    const patchNoteResp = await client.patchNote.getByVersion.query({ patchVersion });
    if (!patchNoteResp.result.patchNote) {
      throw new Error(`[createChampionMatchup] Patch note not found: ${patchVersion}`);
    }

    // Create or get the champion matchup
    const matchupResp = await client.championMatchup.create.mutate({
      patchNoteId: patchNoteResp.result.patchNote.id,
      baseChampionId: baseChampionResp.result.champion.id,
      opponentChampionId: opponentChampionResp.result.champion.id,
      role,
      weightedWinRate: 0,
      totalMatches: 0,
    });

    if (matchupResp.result.status !== ResponseStatus.SUCCESS || !matchupResp.result) {
      throw new Error(`[createChampionMatchup] Could not create or get champion matchup`);
    }

    return matchupResp.result.championMatchup.id;
  } catch (error) {
    console.error(`[createChampionMatchup] - Error creating champion matchup:`, error);
    throw error;
  }
};
