import { Response, type ChampionResponse, type Params } from '../common';
import type {
  CreateChampionInputType,
  GetChampionByIdInputType,
  UpdateChampionInputType,
} from '../schemas/champion.schema';
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

/**
 * Create a new champion.
 *
 * @param ctx - Context with Prisma client.
 * @param input - CreateChampionInputType.
 * @returns Newly created champion.
 */
export const createChampionHandler = async ({
  ctx,
  input,
}: Params<CreateChampionInputType>): Promise<ChampionResponse> => {
  const handlerId = 'createChampionHandler';
  try {
    const champion = await ctx.prisma.champion.create({ data: input });

    if (!champion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NotCreated, ErrorMessages.Champion.NotCreated);

    return { result: { status: Response.SUCCESS, champion } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Update an existing champion.
 *
 * @param ctx - Context with Prisma client.
 * @param input - UpdateChampionInputType.
 * @returns Updated champion.
 */
export const updateChampionHandler = async ({
  ctx,
  input,
}: Params<UpdateChampionInputType>): Promise<ChampionResponse> => {
  const handlerId = 'updateChampionHandler';
  try {
    const { id, ...data } = input;
    const champion = await ctx.prisma.champion.update({ where: { id }, data });

    if (!champion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NotUpdated, ErrorMessages.Champion.NotUpdated);

    return { result: { status: Response.SUCCESS, champion } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
