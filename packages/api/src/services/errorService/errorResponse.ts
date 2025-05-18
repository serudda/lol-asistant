import { ResponseStatus } from '../../common';
import type { ErrorResponse } from './types';

export const errorResponse = (domain: string, handler: string, code: string, message: string): ErrorResponse => ({
  result: {
    status: ResponseStatus.ERROR,
    error: {
      code,
      domain,
      handler,
      message,
    },
  },
});
