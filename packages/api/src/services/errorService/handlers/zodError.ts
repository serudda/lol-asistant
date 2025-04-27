import { TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { TRPCError } from '@trpc/server';
import type { z } from 'zod';

/**
 * Handles specifically Zod validation errors.
 *
 * @param domain Domain where the error occurred.
 * @param handlerId Handler ID.
 * @param error Zod error.
 * @throws TRPCError with validation error details.
 */
export const handleZodError = (domain: string, handlerId: string, error: z.ZodError): never => {
  console.error(`[${domain}][${handlerId}] Validation Error:`, error.errors);

  throw new TRPCError({
    code: TRPCErrorCode.BAD_REQUEST,
    message: ErrorMessages.Common.InvalidInput,
    cause: error,
  });
};
