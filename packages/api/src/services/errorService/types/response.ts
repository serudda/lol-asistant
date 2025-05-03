import type { ResponseStatus } from '../../../common';

export interface ErrorDetail {
  code: string;
  domain: string;
  handler: string;
  message: string;
}

export interface ErrorResponse {
  result: {
    status: ResponseStatus.ERROR;
    error: ErrorDetail;
  };
}
