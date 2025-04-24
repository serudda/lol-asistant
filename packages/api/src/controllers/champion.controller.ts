import { Response, TRPCErrorCode, type ChampionResponse, type Params } from '../common';
import type { GetChampionByIdInputType } from '../schemas/champion.schema';
import { ErrorCodes, ErrorMessages, errorResponse } from '../services';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

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
  try {
    const handlerId = 'getChampionByIdHandler';
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
    if (error instanceof z.ZodError) {
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: ErrorMessages.Common.InvalidInput,
      });
    }

    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message: ErrorMessages.User.UnAuthorized,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }

    console.log('***** INTERNAL_SERVER_ERROR *****', error);
    throw new TRPCError({
      code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.Common.Unknown,
    });
  }
};
