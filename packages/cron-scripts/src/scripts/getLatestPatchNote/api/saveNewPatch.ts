import { OpenAIEmbeddings } from '@langchain/openai';
import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

config();

const db = new PrismaClient();
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export const saveNewPatch = async (summary: string, patchVersion: string, publishedDate: Date): Promise<void> => {
  try {
    console.log('[Saving] - Creating embedding for patch notes...');
    const embedding = await embeddings.embedQuery(summary);

    console.log(`[Saving] - Inserting patch ${patchVersion} with summary...`);
    await db.$transaction(async (tx) => {
      const patchNote = await tx.patchNote.create({
        data: {
          summary,
          patchVersion,
          date: new Date(publishedDate),
        },
      });

      await tx.$executeRaw`
        UPDATE patch_notes 
        SET embedding = ${embedding}::vector
        WHERE id = ${patchNote.id}::uuid
      `;
    });

    console.log('[Saving] - Patch inserted correctly with embedding.');
    process.exit(0);
  } catch (error) {
    console.error('[Saving] - Error inserting patch:', error);
    process.exit(1);
  }
};
