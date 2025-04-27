import type { Prisma } from '@lol-assistant/db';
import { QueryErrorCode, TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { TRPCError } from '@trpc/server';

/**
 * Handles specifically Prisma errors. Translates Prisma
 * error codes to appropriate TRPC errors.
 *
 * @param domain Domain where the error occurred.
 * @param handlerId Handler ID.
 * @param error Prisma error.
 * @throws TRPCError with appropriate details according to
 *   the type of Prisma error.
 */
export const handlePrismaError = (
  domain: string,
  handlerId: string,
  error: Prisma.PrismaClientKnownRequestError,
): never => {
  console.error(`[${domain}][${handlerId}] Database Error:`, {
    code: error.code,
    meta: error.meta,
    message: error.message,
  });

  // Handle specific types of Prisma errors
  switch (error.code) {
    // Unique constraint violation (duplicate unique key)
    case QueryErrorCode.UniqueConstraintViolation:
      throw new TRPCError({
        code: TRPCErrorCode.CONFLICT,
        message: `A record with this ${JSON.stringify(error.meta?.target) || 'value'} already exists`,
        cause: error,
      });

    // Record not found
    case QueryErrorCode.RecordsNotFound:
      throw new TRPCError({
        code: TRPCErrorCode.NOT_FOUND,
        message: 'Record not found',
        cause: error,
      });

    // Foreign key constraint violation
    case QueryErrorCode.ForeignConstraintViolation:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Operation not allowed: conflict with related records',
        cause: error,
      });

    // Invalid value
    case QueryErrorCode.InvalidValue:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Invalid value provided for a field',
        cause: error,
      });

    // Null constraint violation
    case QueryErrorCode.NullConstraintViolation:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Cannot leave a required field empty',
        cause: error,
      });

    // Missing required value
    case QueryErrorCode.MissingRequiredValue:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Missing required value',
        cause: error,
      });

    // Generic validation error
    case QueryErrorCode.ValidationError:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Generic validation error',
        cause: error,
      });

    // Value out of range
    case QueryErrorCode.ValueOutOfRange:
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Value out of range',
        cause: error,
      });

    // Connection pool exhausted
    case QueryErrorCode.TimedOutFetchingConnectionFromThePool:
      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Timeout in the database connection',
        cause: error,
      });

    // For other Prisma errors
    default:
      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.System.DatabaseError,
        cause: error,
      });
  }
};
