import { Prisma } from '@lol-assistant/db';
import { TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { handlePrismaError } from './prismaError';
import { handleTRPCError } from './trpcError';
import { handleZodError } from './zodError';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

/**
 * Identifies the error type and handles it appropriately.
 *
 * @param domain Domain where the error occurred (e.g.,
 *   'USER')
 * @param handlerId Handler ID (e.g., 'getUserByIdHandler')
 * @param error Original error that was caught.
 * @returns A TRPCError instance with appropriate details.
 */
export const handleError = (domain: string, handlerId: string, error: unknown): TRPCError => {
  // Zod validation errors
  if (error instanceof z.ZodError) return handleZodError(domain, handlerId, error);

  // Specific TRPC errors
  if (error instanceof TRPCError) return handleTRPCError(domain, handlerId, error);

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientValidationError) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) return handlePrismaError(domain, handlerId, error);

    // For other Prisma errors (validation, etc.)
    console.error(`[${domain}][${handlerId}] Database Validation Error:`, error);
    return new TRPCError({
      code: TRPCErrorCode.BAD_REQUEST,
      message: ErrorMessages.System.DatabaseError,
      cause: error,
    });
  }

  // Generic/unknown errors
  console.error(`[${domain}][${handlerId}] Unexpected Internal Server Error:`, error);
  if (error instanceof Error) console.error(`[${domain}][${handlerId}] Stack Trace:`, error.stack);

  return new TRPCError({
    code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
    message: ErrorMessages.Common.Unknown,
    cause: error,
  });
};

// Export individual handlers
export * from './prismaError';
export * from './trpcError';
export * from './zodError';
