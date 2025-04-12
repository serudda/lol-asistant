import { Response, TRPCErrorCode, type Params, type UserResponse } from '../common';
import type {
  CreateUserInputType,
  GetUserByEmailInputType,
  GetUserByIdInputType,
  GetUserByUsernameInputType,
} from '../schemas/user.schema';
import { ErrorCodes, ErrorMessages, errorResponse } from '../services';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// Id domain to handle errors
const domain = 'USER';

/**
 * Get user by id.
 *
 * @param ctx Ctx.
 * @param input GetUserByIdInputType.
 * @returns User.
 */
export const getUserByIdHandler = async ({ ctx, input }: Params<GetUserByIdInputType>): Promise<UserResponse> => {
  try {
    const handlerId = 'getUserByIdHandler';
    const user = await ctx.prisma.user.findUnique({
      where: { id: input.id },
      include: {
        accounts: true,
      },
    });

    // Check if user exists
    if (!user) return errorResponse(domain, handlerId, ErrorCodes.User.NoUser, ErrorMessages.User.NoUser);

    return {
      result: {
        status: Response.SUCCESS,
        user,
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

    throw new TRPCError({
      code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.Common.Unknown,
    });
  }
};

/**
 * Get user by email.
 *
 * @param ctx Ctx.
 * @param input GetUserByEmailInputType.
 * @returns User.
 */
export const getUserByEmailHandler = async ({ ctx, input }: Params<GetUserByEmailInputType>): Promise<UserResponse> => {
  const handlerId = 'getUserByEmailHandler';

  try {
    const user = await ctx.prisma.user.findUnique({
      where: {
        email: input.email,
      },
      include: {
        accounts: true,
      },
    });

    // Check if user exists
    if (!user) return errorResponse(domain, handlerId, ErrorCodes.User.NoUser, ErrorMessages.User.NoUser);

    return {
      result: {
        status: Response.SUCCESS,
        user,
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

    throw new TRPCError({
      code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.Common.Unknown,
    });
  }
};

/**
 * Get user by username.
 *
 * @param ctx Ctx.
 * @param input GetUserByUsernameInputType.
 * @returns User.
 */
export const getUserByUsernameHandler = async ({
  ctx,
  input,
}: Params<GetUserByUsernameInputType>): Promise<UserResponse> => {
  const handlerId = 'getUserByUsernameHandler';
  try {
    const { username } = input;

    const user = await ctx.prisma.user.findFirst({
      where: {
        username,
      },
      include: {
        accounts: true,
      },
    });

    // Check if user exists
    if (!user) return errorResponse(domain, handlerId, ErrorCodes.User.NoUser, ErrorMessages.User.NoUser);

    return {
      result: {
        status: Response.SUCCESS,
        user,
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

    throw new TRPCError({
      code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.Common.Unknown,
    });
  }
};

/**
 * Create user.
 *
 * @param ctx Ctx.
 * @param input CreateUserInputType.
 * @returns User.
 */
export const createUserHandler = async ({ ctx, input }: Params<CreateUserInputType>): Promise<UserResponse> => {
  try {
    const handlerId = 'createUserHandler';
    const { name, username, email, image } = input;

    const user = await ctx.prisma.user.create({
      data: {
        name,
        username,
        image,
        email,
      },
    });

    // Check if user was created
    if (!user) return errorResponse(domain, handlerId, ErrorCodes.User.NoUserCreated, ErrorMessages.User.NoUserCreated);

    return {
      result: {
        status: Response.SUCCESS,
        user,
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

    throw new TRPCError({
      code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
      message: ErrorMessages.Common.Unknown,
    });
  }
};
