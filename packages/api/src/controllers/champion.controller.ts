import { Response, type ChampionResponse, type Params } from '../common';
import type { GetChampionByIdInputType } from '../schemas/champion.schema';
import { ErrorCodes, ErrorMessages, errorResponse, handleError } from '../services';

// Id domain to handle errors
const domain = 'CHAMPION';

/**
 * Get champion by ID.
 *
 * @param ctx Ctx.
 * @param input GetChampionByIdInputType.
 * @returns Champion.
 */
export const getChampionByIdHandler = async ({
  ctx,
  input,
}: Params<GetChampionByIdInputType>): Promise<ChampionResponse> => {
  const handlerId = 'getChampionByIdHandler';
  try {
    const { id } = input;
    const champion = await ctx.prisma.champion.findUnique({ where: { id } });

    if (!champion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);

    return {
      result: {
        status: Response.SUCCESS,
        champion,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
