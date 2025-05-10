import type { ErrorCodes } from './codes';

type ErrorMessageType = {
  [K in keyof typeof ErrorCodes]: {
    [P in keyof (typeof ErrorCodes)[K]]: string;
  };
};

export const ErrorMessages: ErrorMessageType = {
  Account: {
    NotCreated: 'Something happened, we could not create the user account',
  },
  Common: {
    ConfigNotFound: 'Configuration not found',
    InvalidInput: 'Invalid input',
    Unknown: 'Unknown error, please try again',
  },
  System: {
    DatabaseError: 'Database error, please try again',
    UnexpectedError: 'Unexpected error, please try again',
    InvalidInput: 'Invalid input',
  },
  Subscription: {
    UserAlreadyHasSubscription: 'User already has an active subscription',
  },
  User: {
    UnAuthorized: 'You are not authorized to perform this action',
    NoUser: 'Could not find your user, verify that you collect cards with `/start-game`',
    NoUserCreated: 'Something happened, we could not create the user',
    AlreadyExists: 'This user already exists',
  },
  Champion: {
    AlreadyExists: 'A champion with this slug already exists',
    NoChampion: 'Could not find the champion you are looking for',
    NoChampions: 'Could not find any champions',
    NotCreated: 'Something happened, we could not create the champion',
    NotUpdated: 'Something happened, we could not update the champion',
    BaseChampionNotFound: 'Base champion not found',
    OpponentChampionNotFound: 'Opponent champion not found',
  },
  PatchNote: {
    NoPatchNote: 'Could not find the patch note',
    NotCreated: 'Could not create the patch note',
  },
  Source: {
    NoSource: 'Could not find the source you are looking for',
    AlreadyExists: 'A source with this slug already exists',
    NotCreated: 'Something happened, we could not create the source',
  },
  SourceStats: {
    NoSourceMatchupStats: 'Could not find any source matchup stats',
  },
  ChampionMatchup: {
    AlreadyExists: 'This champion matchup already exists',
    NotCreated: 'Could not create the champion matchup',
    NoChampionMatchup: 'Champion matchup not found',
  },
};
