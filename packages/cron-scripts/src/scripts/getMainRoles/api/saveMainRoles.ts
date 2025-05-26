import type { LoLChampionRole } from '@lol-assistant/db';
import { createClient } from '../../../utils/trpc-client';

export interface SaveMainRolesInput {
  championSlug: string;
  mainRoles: Array<LoLChampionRole>; // e.g. ['adc', 'support']
}

/**
 * Save mainRoles for all champions in the database.
 *
 * @param roles Array of SaveMainRolesInput objects.
 */
// eslint-disable-next-line
export const saveMainRoles = async (roles: Array<SaveMainRolesInput>): Promise<void> => {
  const client = createClient();
  console.log('[Saving] [saveMainRoles] Not implemented yet.');
  // TODO: Implement DB update logic
  console.log('client', client);
  console.log('roles', roles);
  return;
};
