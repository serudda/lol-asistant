import { TRPCErrorCode } from '../../../common';
import { ErrorMessages } from '../constants/messages';
import { TRPCError } from '@trpc/server';

/**
 * Handles specifically TRPC errors, allowing mapping
 * certain error codes to custom messages.
 *
 * @param domain Domain where the error occurred.
 * @param handlerId Handler ID.
 * @param error TRPC error.
 * @returns A transformed TRPCError if needed.
 */
export const handleTRPCError = (domain: string, handlerId: string, error: TRPCError): TRPCError => {
  console.error(`[${domain}][${handlerId}] TRPC Error: Code=${error.code}, Message=${error.message}`, error.cause);

  // Transform specific errors if necessary
  if (error.code === TRPCErrorCode.UNAUTHORIZED) {
    return new TRPCError({
      code: TRPCErrorCode.UNAUTHORIZED,
      message: ErrorMessages.User.UnAuthorized,
      cause: error,
    });
  }

  // For other TRPC errors, simply forward them
  return error;
};
