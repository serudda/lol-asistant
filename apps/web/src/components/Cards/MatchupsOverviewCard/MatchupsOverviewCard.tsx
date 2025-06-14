import type { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { Avatar, AvatarSize } from '@lol-assistant/ui';
import { trpc } from '../../../utils/api';
import { MatchupsOverviewCardGroup, type MatchupsOverviewCardGroupType } from '../types';
import { MatchupsOverviewCardSkeleton } from './Skeleton';
import { tv } from 'tailwind-variants';

const Labels = {
  [MatchupsOverviewCardGroup.easiest]: {
    title: 'Strong against',
    subtitle: 'Easiest matchups',
  },
  [MatchupsOverviewCardGroup.hardest]: {
    title: 'Weak against',
    subtitle: 'Hardest matchups',
  },
} as const;

const getHeatmapColor = (type: MatchupsOverviewCardGroupType, index: number) => {
  if (type === MatchupsOverviewCardGroup.easiest)
    return ['bg-emerald-600', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300', 'bg-emerald-200'][index];

  return ['bg-red-600', 'bg-red-500', 'bg-red-400', 'bg-red-300', 'bg-red-200'][index];
};

const container = tv({
  base: ['w-full flex flex-col gap-2'],
});

const card = tv({
  base: ['flex items-center gap-1', 'ring-1 ring-gray-800 bg-gray-900 rounded-lg', 'w-full p-6 overflow-hidden'],
});

const heatmapLine = tv({
  base: ['w-full h-1'],
});

export interface MatchupsOverviewCardProps {
  /**
   * Type of matchup.
   */
  type: MatchupsOverviewCardGroupType;

  /**
   * Champion slug.
   */
  championSlug: string;

  /**
   * Champion role.
   */
  role: LoLChampionRole;

  /**
   * Patch version.
   */
  patchVersion: string;

  /**
   * Rank tier.
   */
  rankTier: RankTier;

  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * A card to display a linear heatmap of matchups.
 */
export const MatchupsOverviewCard = ({
  className,
  type = MatchupsOverviewCardGroup.easiest,
  championSlug,
  role,
  patchVersion,
  rankTier,
}: MatchupsOverviewCardProps) => {
  const classes = {
    container: container({ className }),
    card: card({ className }),
  };

  const { data, isLoading, error } = trpc.championMatchup.getMatchupOverview.useQuery({
    baseChampionSlug: championSlug,
    role,
    rankTier,
    patchVersion,
  });

  if (isLoading) return <MatchupsOverviewCardSkeleton />;
  if (error ?? !data?.result) return <div>Error: {error?.message}</div>;

  const matchups = data.result[type];

  return (
    <div className={classes.container}>
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-medium flex items-center gap-2">{Labels[type].title}</h3>
        <span className="text-gray-500 text-base">({Labels[type].subtitle})</span>
      </div>
      <div className={classes.card}>
        {matchups?.map((matchup, index) => (
          <div key={matchup.opponentChampion.id} className="flex flex-col items-center w-full gap-4">
            <div className="flex flex-col items-center gap-2">
              <Avatar size={AvatarSize.lg}>
                <Avatar.Image src={matchup.opponentChampion.splashUrl ?? ''} />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-center">{matchup.opponentChampion.name}</span>
                <span className="text-sm text-center text-gray-400">{(100 - matchup.weightedWinRate).toFixed(1)}%</span>
              </div>
            </div>
            <div className={heatmapLine({ className: getHeatmapColor(type, index) })} />
          </div>
        ))}
      </div>
    </div>
  );
};
