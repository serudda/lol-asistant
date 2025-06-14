import type { LoLChampionRole, RankTier } from '@lol-assistant/db';
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

const container = tv({
  base: ['w-full flex flex-col gap-2'],
});

const title = tv({
  base: ['text-xl font-medium flex items-center gap-2'],
  variants: {
    type: {
      [MatchupsOverviewCardGroup.easiest]: ['text-emerald-400'],
      [MatchupsOverviewCardGroup.hardest]: ['text-red-400'],
    },
  },
});

const card = tv({
  base: ['flex items-center gap-1', 'ring-1 ring-gray-800 bg-gray-900 rounded-lg', 'w-full p-6 overflow-hidden'],
});

const winRateLabel = tv({
  base: ['text-sm text-center'],
  variants: {
    type: {
      [MatchupsOverviewCardGroup.easiest]: ['text-emerald-400'],
      [MatchupsOverviewCardGroup.hardest]: ['text-red-400'],
    },
  },
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
        <h3 className={title({ type })}>{Labels[type].title}</h3>
        <span className="text-gray-500 text-base">({Labels[type].subtitle})</span>
      </div>
      <div className={classes.card}>
        {matchups?.map((matchup) => (
          <div key={matchup.opponentChampion.id} className="flex flex-col items-center w-full gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden rounded h-[181px] w-[75px] relative ring-1 ring-gray-800 group">
                <img
                  alt={matchup.opponentChampion.name}
                  loading="lazy"
                  decoding="async"
                  data-nimg="fill"
                  className="h-full w-full scale-110 bg-cover relative bg-center bg-no-repeat object-cover"
                  src={matchup.opponentChampion.splashUrl ?? ''}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-center">{matchup.opponentChampion.name}</span>
                <span className={winRateLabel({ type })}>{(100 - matchup.weightedWinRate).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
