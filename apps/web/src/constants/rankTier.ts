import { RankTier } from '@prisma/client';

export const rankTierOptions = [
  { value: RankTier.iron, label: 'Iron', imageUrl: '/assets/rankTiers/iron.svg' },
  { value: RankTier.bronze, label: 'Bronze', imageUrl: '/assets/rankTiers/bronze.svg' },
  { value: RankTier.silver, label: 'Silver', imageUrl: '/assets/rankTiers/silver.svg' },
  { value: RankTier.gold, label: 'Gold', imageUrl: '/assets/rankTiers/gold.svg' },
  { value: RankTier.platinum, label: 'Platinum', imageUrl: '/assets/rankTiers/platinum.svg' },
  { value: RankTier.platinumPlus, label: 'Platinum+', imageUrl: '/assets/rankTiers/platinum-plus.svg' },
  { value: RankTier.emerald, label: 'Emerald', imageUrl: '/assets/rankTiers/emerald.svg' },
  { value: RankTier.emeraldPlus, label: 'Emerald+', imageUrl: '/assets/rankTiers/emerald-plus.svg' },
  { value: RankTier.diamond, label: 'Diamond', imageUrl: '/assets/rankTiers/diamond.svg' },
  { value: RankTier.diamondPlus, label: 'Diamond+', imageUrl: '/assets/rankTiers/diamond-plus.svg' },
  { value: RankTier.master, label: 'Master', imageUrl: '/assets/rankTiers/master.svg' },
  { value: RankTier.grandmaster, label: 'Grandmaster', imageUrl: '/assets/rankTiers/grandmaster.svg' },
  { value: RankTier.challenger, label: 'Challenger', imageUrl: '/assets/rankTiers/challenger.svg' },
];
