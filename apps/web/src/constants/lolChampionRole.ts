import { LoLChampionRole } from '@prisma/client';

export const roleOptions = [
  { value: LoLChampionRole.top, label: 'Top', imageUrl: '/assets/roles/lol-role-top.svg' },
  { value: LoLChampionRole.jungle, label: 'Jungle', imageUrl: '/assets/roles/lol-role-jungle.svg' },
  { value: LoLChampionRole.mid, label: 'Mid', imageUrl: '/assets/roles/lol-role-mid.svg' },
  { value: LoLChampionRole.adc, label: 'ADC', imageUrl: '/assets/roles/lol-role-adc.svg' },
  { value: LoLChampionRole.support, label: 'Support', imageUrl: '/assets/roles/lol-role-support.svg' },
];
