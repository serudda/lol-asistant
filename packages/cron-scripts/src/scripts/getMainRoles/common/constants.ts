import { LoLChampionRole } from '@lol-assistant/db';

export enum LeagueOfGraphsRole {
  top = 'TOP',
  jungle = 'JUNGLE',
  mid = 'MIDDLE',
  adc = 'ADC',
  support = 'SUPPORT',
}

// Mappers for League of Graphs to LoLChampionRole
export const toLoLChampionRole = (role: LeagueOfGraphsRole): LoLChampionRole => {
  switch (role) {
    case LeagueOfGraphsRole.top:
      return LoLChampionRole.top;
    case LeagueOfGraphsRole.jungle:
      return LoLChampionRole.jungle;
    case LeagueOfGraphsRole.mid:
      return LoLChampionRole.mid;
    case LeagueOfGraphsRole.adc:
      return LoLChampionRole.adc;
    case LeagueOfGraphsRole.support:
      return LoLChampionRole.support;
    default:
      throw new Error('[toLoLChampionRole] Unknown internal role:', role);
  }
};
