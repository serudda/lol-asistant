import type { PatchNoteResponse } from '@lol-assistant/api';
import { createClient } from '../../utils/trpc-client';

export const getLastestPatch = async (): Promise<PatchNoteResponse> => {
  try {
    const client = createClient();
    const latestPatch = await client.patchNote.getLatest.query({});
    return latestPatch;
  } catch (error) {
    console.error('[Getting] - Error fetching latest patch:', error);
    throw error;
  }
};
