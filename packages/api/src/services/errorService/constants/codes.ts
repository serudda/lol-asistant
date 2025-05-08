export const ErrorCodes = {
  Account: {
    NotCreated: 'AccountNotCreated',
  },
  Common: {
    ConfigNotFound: 'ConfigNotFound',
    InvalidInput: 'InvalidInput',
    Unknown: 'Unknown',
  },
  Subscription: {
    UserAlreadyHasSubscription: 'UserAlreadyHasSubscription',
  },
  User: {
    UnAuthorized: 'UnAuthorized',
    NoUser: 'NoUser',
    NoUserCreated: 'NoUserCreated',
    AlreadyExists: 'UserAlreadyExists',
  },
  System: {
    InvalidInput: 'InvalidInput',
    DatabaseError: 'DatabaseError',
    UnexpectedError: 'UnexpectedError',
  },
  Champion: {
    AlreadyExists: 'AlreadyExists',
    NoChampion: 'NoChampion',
    NoChampions: 'NoChampions',
    NotCreated: 'NotCreated',
    NotUpdated: 'NotUpdated',
  },
  PatchNote: {
    NotCreated: 'NotCreated',
  },
  Source: {
    NoSource: 'NoSource',
    AlreadyExists: 'AlreadyExists',
    NotCreated: 'NotCreated',
  },
} as const;
