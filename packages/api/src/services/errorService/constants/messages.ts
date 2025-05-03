import type { ErrorCodes } from './codes';

type ErrorMessageType = {
  [K in keyof typeof ErrorCodes]: {
    [P in keyof (typeof ErrorCodes)[K]]: string;
  };
};

export const ErrorMessages: ErrorMessageType = {
  Account: {
    NotCreated: 'Algo ha sucedido, no pudimos crear la cuenta del usuario',
  },
  Common: {
    ConfigNotFound: 'Configuración no encontrada',
    InvalidInput: 'Entrada inválida',
    Unknown: 'Error desconocido, por favor intenta de nuevo',
  },
  System: {
    DatabaseError: 'Error de base de datos, por favor intenta de nuevo',
    UnexpectedError: 'Error inesperado, por favor intenta de nuevo',
    InvalidInput: 'Entrada inválida',
  },
  Subscription: {
    UserAlreadyHasSubscription: 'El usuario ya tiene una suscripción activa',
  },
  User: {
    UnAuthorized: 'No estas autorizado para realizar esta acción',
    NoUser: 'No logre encontrar tu usuario, verifica que coleccionas cartas con `/start-game`',
    NoUserCreated: 'Algo ha sucedido, no pudimos crear al usuario',
    AlreadyExists: 'Este usuarios ya existe',
  },
  Champion: {
    AlreadyExists: 'A champion with this slug already exists',
    NoChampion: 'No encontramos al campeón que buscas',
    NoChampions: 'No encontramos ningún campeón',
    NotCreated: 'Algo ha sucedido, no pudimos crear al campeón',
    NotUpdated: 'Algo ha sucedido, no pudimos actualizar al campeón',
  },
  PatchNote: {
    NotCreated: 'Algo ha sucedido, no pudimos crear la nota de parche',
  },
};
