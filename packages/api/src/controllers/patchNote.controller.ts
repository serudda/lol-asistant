import type { PatchNoteResponse} from '../common';
import { Response, type Params } from '../common';
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
      orderBy: { date: 'desc' },
    });

    if (!patchNote)
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);

    return { result: { status: Response.SUCCESS, patchNote } };
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
    const patchNote = await ctx.prisma.patchNote.create({ data: input });

    if (!patchNote)
      return errorResponse(domain, handlerId, ErrorCodes.PatchNote.NotCreated, ErrorMessages.PatchNote.NotCreated);

    return { result: { status: Response.SUCCESS, patchNote } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
