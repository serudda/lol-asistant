export const ErrorCodes = {
  Account: {
    NotCreated: 'AccountNotCreated',
    DiscordUserNotFound: 'DiscordUserNotFound',
  },
  Champion: {
    NoChampion: 'NoChampion',
    NoChampions: 'NoChampions',
    NotCreated: 'NotCreated',
    NotUpdated: 'NotUpdated',
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
} as const;
