import type { LoLChampionRole } from '@lol-assistant/db';
import type { LeagueOfGraphsRole } from './constants';
import { toLoLChampionRole } from './constants';
import * as cheerio from 'cheerio';

export interface MainRole {
  role: LoLChampionRole;
  popularity: number;
}

/**
 * Extracts champion main roles data from an League of
 * Graphs HTML page.
 *
 * @param championSlug - The slug of the champion. e.g.
 *   'ahri'.
 * @param html - The HTML content of the page.
 * @returns ChampionRolePopularity object for the champion.
 */
export const extractDataFromHtml = (html: string): Array<MainRole> => {
  const $ = cheerio.load(html);
  const rolesTable = $('#mainContent h3.box-title:contains("Roles")').next('table.data_table.sortable_table');
  if (!rolesTable.length) throw new Error('Roles table not found');

  const roles: Array<MainRole> = [];
  rolesTable.find('tr').each((i, row) => {
    // Skip header
    if (i === 0) return;
    const tds = $(row).find('td');
    if (tds.length < 2) return;

    // Role
    const role = tds.eq(0).find('a').attr('filter-role') as LeagueOfGraphsRole;

    // Popularity
    const progressbar = tds.eq(1).find('progressbar');
    const dataValue = progressbar.attr('data-value');
    const popularity = dataValue ? parseFloat(dataValue) * 100 : NaN;

    if (role && !isNaN(popularity)) {
      const mainRole: MainRole = {
        role: toLoLChampionRole(role),
        popularity,
      };
      roles.push(mainRole);
    }
  });

  return roles;
};
