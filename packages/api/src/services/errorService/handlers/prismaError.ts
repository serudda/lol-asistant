import type { Prisma } from '@lol-assistant/db';
import { QueryErrorCode, TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { TRPCError } from '@trpc/server';

/**
 * Handles Prisma-specific errors. Translates Prisma error
 * codes to appropriate TRPC errors.
 *
 * @param domain Domain where the error occurred.
 * @param handlerId Handler ID.
 * @param error Prisma error.
 * @returns A TRPCError with details according to the Prisma
 *   error type.
 */
export const handlePrismaError = (
  domain: string,
  handlerId: string,
  error: Prisma.PrismaClientKnownRequestError,
): TRPCError => {
  console.error(`[${domain}][${handlerId}] Database Error:`, {
    code: error.code,
    meta: error.meta,
    message: error.message,
  });

  // Handle specific Prisma error types
  switch (error.code) {
    // Uniqueness violation (unique key constraint)
    case QueryErrorCode.UniqueConstraintViolation:
      return new TRPCError({
        code: TRPCErrorCode.CONFLICT,
        message: `A record already exists with this ${JSON.stringify(error.meta?.target) || 'value'}`,
        cause: error,
      });

    // Record not found
    case QueryErrorCode.RecordsNotFound:
      return new TRPCError({
        code: TRPCErrorCode.NOT_FOUND,
        message: 'Record not found',
        cause: error,
      });

    // Foreign key constraint
    case QueryErrorCode.ForeignConstraintViolation:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Operation not allowed: conflict with related records',
        cause: error,
      });

    // Invalid value provided
    case QueryErrorCode.InvalidValue:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Invalid value provided for a field',
        cause: error,
      });

    // Required field violation (null constraint)
    case QueryErrorCode.NullConstraintViolation:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Cannot leave a required field empty',
        cause: error,
      });

    // Missing required value
    case QueryErrorCode.MissingRequiredValue:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Missing required value',
        cause: error,
      });

    // Generic validation error
    case QueryErrorCode.ValidationError:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Data validation error',
        cause: error,
      });

    // Value out of range
    case QueryErrorCode.ValueOutOfRange:
      return new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message: 'Value out of allowed range',
        cause: error,
      });

    // Connection pool timeout
    case QueryErrorCode.TimedOutFetchingConnectionFromThePool:
      return new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Database connection timeout',
        cause: error,
      });

    // For other Prisma errors
    default:
      return new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: ErrorMessages.System.DatabaseError,
        cause: error,
      });
  }
};
