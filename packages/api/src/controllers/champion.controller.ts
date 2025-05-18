import { ResponseStatus, type BasicChampionsResponse, type ChampionResponse, type Params } from '../common';
import type {
  CreateChampionInputType,
  GetAllBasicChampionsInputType,
  GetChampionByIdInputType,
  GetChampionBySlugInputType,
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
        status: ResponseStatus.SUCCESS,
        champion,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get champion by slug.
 *
 * @param ctx Ctx.
 * @param input GetChampionBySlugInputType.
 * @returns Champion.
 */
export const getChampionBySlugHandler = async ({
  ctx,
  input,
}: Params<GetChampionBySlugInputType>): Promise<ChampionResponse> => {
  const handlerId = 'getChampionBySlugHandler';
  try {
    const { slug } = input;
    const champion = await ctx.prisma.champion.findUnique({ where: { slug } });

    // If the champion does not exist, return an error
    if (!champion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        champion,
      },
    };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};

/**
 * Get all champions (basic info).
 *
 * @param ctx Ctx.
 * @returns List of champions (id, name, slug, imageUrl).
 */
export const getAllBasicChampionsHandler = async ({
  ctx,
}: Params<GetAllBasicChampionsInputType>): Promise<BasicChampionsResponse> => {
  const handlerId = 'getAllBasicChampionsHandler';
  try {
    const champions = await ctx.prisma.champion.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    });

    if (!champions)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampions, ErrorMessages.Champion.NoChampions);

    return {
      result: {
        status: ResponseStatus.SUCCESS,
        champions,
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
    // Check if the champion already exists
    const existingChampion = await getChampionBySlugHandler({ ctx, input: { slug: input.slug } });
    if (existingChampion.result.champion) {
      return errorResponse(domain, handlerId, ErrorCodes.Champion.AlreadyExists, ErrorMessages.Champion.AlreadyExists);
    }

    // Create the champion
    const champion = await ctx.prisma.champion.create({
      data: {
        ...input,
      },
    });

    if (!champion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NotCreated, ErrorMessages.Champion.NotCreated);

    return { result: { status: ResponseStatus.SUCCESS, champion } };
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

    // Check if champion exists
    const existingChampion = await getChampionByIdHandler({ ctx, input: { id } });
    if (!existingChampion.result.champion) {
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NoChampion, ErrorMessages.Champion.NoChampion);
    }

    // Update the champion
    const updatedChampion = await ctx.prisma.champion.update({
      where: { id: existingChampion.result.champion.id },
      data: {
        ...data,
      },
    });

    if (!updatedChampion)
      return errorResponse(domain, handlerId, ErrorCodes.Champion.NotUpdated, ErrorMessages.Champion.NotUpdated);

    return { result: { status: ResponseStatus.SUCCESS, champion: updatedChampion } };
  } catch (error: unknown) {
    throw handleError(domain, handlerId, error);
  }
};
