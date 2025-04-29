import type { Account, Champion, PatchNote, User } from '@lol-assistant/db';

export enum Response {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface BaseResponse {
  status: Response;
}

export type SuccessResponse<T> = BaseResponse & {
  status: Response.SUCCESS;
} & T;

export interface ErrorDetail {
  code: string;
  domain: string;
  handler: string;
  message: string;
}

export type ErrorResponse = BaseResponse & {
  status: Response.ERROR;
  error: ErrorDetail;
};

// Modificamos ApiResponse para que muestre todas las propiedades posibles
export type ApiResponse<T> = {
  result: {
    status: Response;
    error?: ErrorDetail;
  } & Partial<T>;
};

// Specific response type for each endpoint organized by domain

// Account
export type AccountResponse = ApiResponse<{ account: Account }>;
export type AccountsResponse = ApiResponse<{ accounts: Array<Account> }>;

// User
export type UserResponse = ApiResponse<{ user: User }>;

// Champion
export type ChampionResponse = ApiResponse<{ champion: Champion }>;
export type ChampionsResponse = ApiResponse<{ champions: Array<Champion> }>;

// Patch Note
export type PatchNoteResponse = ApiResponse<{ patchNote: PatchNote }>;
export type PatchNotesResponse = ApiResponse<{ patchNotes: Array<PatchNote> }>;
