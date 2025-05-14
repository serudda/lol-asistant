import { RankTier } from '@lol-assistant/db';
import { RankTierIcon } from '../../RankTierIcon/RankTierIcon';

export const rankTierOptions = [
  {
    value: RankTier.iron,
    label: 'Iron',
    icon: <RankTierIcon rankTier={RankTier.iron} className="size-6" />,
  },
  {
    value: RankTier.bronze,
    label: 'Bronze',
    icon: <RankTierIcon rankTier={RankTier.bronze} className="size-6" />,
  },
  {
    value: RankTier.silver,
    label: 'Silver',
    icon: <RankTierIcon rankTier={RankTier.silver} className="size-6" />,
  },
  {
    value: RankTier.gold,
    label: 'Gold',
    icon: <RankTierIcon rankTier={RankTier.gold} className="size-6" />,
  },
  {
    value: RankTier.platinum,
    label: 'Platinum',
    icon: <RankTierIcon rankTier={RankTier.platinum} className="size-6" />,
  },
  {
    value: RankTier.platinumPlus,
    label: 'Platinum+',
    icon: <RankTierIcon rankTier={RankTier.platinumPlus} className="size-6" />,
  },
  {
    value: RankTier.emerald,
    label: 'Emerald',
    icon: <RankTierIcon rankTier={RankTier.emerald} className="size-6" />,
  },
  {
    value: RankTier.emeraldPlus,
    label: 'Emerald+',
    icon: <RankTierIcon rankTier={RankTier.emeraldPlus} className="size-6" />,
  },
  {
    value: RankTier.diamond,
    label: 'Diamond',
    icon: <RankTierIcon rankTier={RankTier.diamond} className="size-6" />,
  },
  {
    value: RankTier.diamondPlus,
    label: 'Diamond+',
    icon: <RankTierIcon rankTier={RankTier.diamondPlus} className="size-6" />,
  },
  {
    value: RankTier.master,
    label: 'Master',
    icon: <RankTierIcon rankTier={RankTier.master} className="size-6" />,
  },
  {
    value: RankTier.grandmaster,
    label: 'Grandmaster',
    icon: <RankTierIcon rankTier={RankTier.grandmaster} className="size-6" />,
  },
  {
    value: RankTier.challenger,
    label: 'Challenger',
    icon: <RankTierIcon rankTier={RankTier.challenger} className="size-6" />,
  },
];
