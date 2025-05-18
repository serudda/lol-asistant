import { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { z, type TypeOf } from 'zod';

export const rankTierEnum = z.nativeEnum(RankTier);
export type RankTierEnumType = TypeOf<typeof rankTierEnum>;

export const roleEnum = z.nativeEnum(LoLChampionRole);
export type RoleEnumType = TypeOf<typeof roleEnum>;
