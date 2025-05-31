import { createClient } from '../../utils/trpc-client';
import { OpenAIEmbeddings } from '@langchain/openai';

const embeddings = new OpenAIEmbeddings();

export const saveNewPatch = async (
  summary: string,
  patchVersion: string,
  riotPatch: string,
  publishedDate: string,
): Promise<void> => {
  try {
    console.log('[Saving] - Creating embedding for patch notes...');
    const client = createClient();
    const embedding = await embeddings.embedQuery(summary);

    console.log(`[Saving] - Inserting patch ${patchVersion} with summary...`);
    await client.patchNote.createPatchNote.mutate({
      summary,
      patchVersion,
      riotPatch,
      publishedDate,
      embedding,
    });

    console.log('[Saving] - Patch inserted correctly with embedding.');
  } catch (error) {
    console.error('[Saving] - Error inserting patch:', error);
    throw error;
  }
};
