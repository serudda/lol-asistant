import type { JsonValue } from '@prisma/client/runtime/library';

export const transformJsonValue = (value: JsonValue | null): Record<string, any> | undefined => {
  if (value === null) return undefined;
  return value as Record<string, any>;
};
