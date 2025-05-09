import type { PatchNoteResponse } from '../common';
import { ResponseStatus, type Params } from '../common';
import type { CreatePatchNoteInputType, GetLatestPatchNoteInputType } from '../schemas/patchNote.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';

// Id domain to handle errors
const domain = 'PATCH_NOTE';

/**
 * Get the latest patch note.
 *
 * @param ctx - Context with Prisma client.
 * @returns Latest patch note.
 */
export const getLatestPatchNoteHandler = async ({
  ctx,
}: Params<GetLatestPatchNoteInputType>): Promise<PatchNoteResponse> => {
  const handlerId = 'getLatestPatchNoteHandler';
  try {
    const patchNote = await ctx.prisma.patchNote.findFirst({
      orderBy: { publishedDate: 'desc' },
    });

    if (!patchNote)
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);

    return { result: { status: ResponseStatus.SUCCESS, patchNote } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Create a new patch note.
 *
 * @param ctx - Context with Prisma client.
 * @param input - CreatePatchNoteInputType.
 * @returns Newly created patch note.
 */
export const createPatchNoteHandler = async ({
  ctx,
  input,
}: Params<CreatePatchNoteInputType>): Promise<PatchNoteResponse> => {
  const handlerId = 'createPatchNoteHandler';
  try {
    const { summary, patchVersion, publishedDate, embedding } = input;

    // Start transaction
    return await ctx.prisma.$transaction(async (tx) => {
      // Create patch note
      const patchNote = await tx.patchNote.create({
        data: {
          summary,
          patchVersion,
          publishedDate,
        },
      });

      if (!patchNote)
        return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);

      // Update embedding
      await tx.$executeRaw`
        UPDATE patch_notes 
        SET embedding = ${embedding}::vector
        WHERE id = ${patchNote.id}::uuid
      `;

      return { result: { status: ResponseStatus.SUCCESS, patchNote } };
    });
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get patch note by patchVersion.
 *
 * @param ctx - Context with Prisma client.
 * @param input - { patchVersion: string }
 * @returns Patch note.
 */
export const getPatchNoteByVersionHandler = async ({
  ctx,
  input,
}: Params<{ patchVersion: string }>): Promise<PatchNoteResponse> => {
  const handlerId = 'getPatchNoteByVersionHandler';
  try {
    const patchNote = await ctx.prisma.patchNote.findFirst({ where: { patchVersion: input.patchVersion } });
    if (!patchNote)
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NoPatchNote, ErrorMessages.PatchNote.NoPatchNote);
    return { result: { status: ResponseStatus.SUCCESS, patchNote } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
