import { TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';

/**
 * Specifically handles Zod validation errors.
 *
 * @param domain Domain where the error occurred.
 * @param handlerId Handler ID.
 * @param error Zod error.
 * @returns A TRPCError with validation error details.
 */
export const handleZodError = (domain: string, handlerId: string, error: z.ZodError): TRPCError => {
  console.error(`[${domain}][${handlerId}] Validation Error:`, error.errors);

  return new TRPCError({
    code: TRPCErrorCode.BAD_REQUEST,
    message: ErrorMessages.Common.InvalidInput,
    cause: error,
  });
};
