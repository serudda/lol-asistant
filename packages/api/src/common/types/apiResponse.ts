import type { Account, Champion, PatchNote, User } from '@lol-assistant/db';
import type { ResponseStatus } from '../constants';

export interface BaseResponse {
  status: ResponseStatus;
}

export type SuccessResponse<T> = BaseResponse & {
  status: ResponseStatus.SUCCESS;
} & T;

export interface ErrorDetail {
  code: string;
  domain: string;
  handler: string;
  message: string;
}

export type ErrorResponse = BaseResponse & {
  status: ResponseStatus.ERROR;
  error: ErrorDetail;
};

// Modificamos ApiResponse para que muestre todas las propiedades posibles
export type ApiResponse<T> = {
  result: {
    status: ResponseStatus;
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

// Champion (basic info for lists)
export type BasicChampion = Pick<Champion, 'id' | 'name' | 'slug' | 'imageUrl'>;
export type BasicChampionsResponse = ApiResponse<{ champions: Array<BasicChampion> }>;

// Patch Note
export type PatchNoteResponse = ApiResponse<{ patchNote: PatchNote }>;
export type PatchNotesResponse = ApiResponse<{ patchNotes: Array<PatchNote> }>;
