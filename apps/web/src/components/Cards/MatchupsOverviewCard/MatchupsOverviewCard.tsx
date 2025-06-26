import type { LoLChampionRole, RankTier } from '@lol-assistant/db';
import { Image } from '@lol-assistant/ui';
import { trpc } from '../../../utils/api';
import { RoleIcon } from '../../RoleIcon/RoleIcon';
import { MatchupsOverviewCardGroup, type MatchupsOverviewCardGroupType } from '../types';
import { MatchupsOverviewCardSkeleton } from './Skeleton';
import { Link } from '@tanstack/react-router';
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

const matchupItem = tv({
  base: ['group flex flex-col items-center w-full gap-4', 'cursor-pointer'],
});

const winRateLabel = tv({
  base: ['text-center'],
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
  patchVersion?: string;

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

  if (!patchVersion) return <MatchupsOverviewCardSkeleton />;

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
        <div className="flex items-center gap-1 ml-1">
          <RoleIcon role={role} className="size-5 text-gray-500" />
          <h3 className={title({ type })}>{Labels[type].title}</h3>
        </div>
        <span className="text-gray-500 text-base">({Labels[type].subtitle})</span>
      </div>
      <div className={classes.card}>
        {matchups?.map((matchup) => (
          <Link
            key={matchup.opponentChampion.id}
            to="/champions/$championName"
            params={{ championName: matchup.opponentChampion.slug }}
            search={{ role }}
            className={matchupItem()}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="overflow-hidden rounded h-[181px] w-[75px] relative ring-1 ring-gray-800 bg-gray-800 group-hover:ring-gray-600">
                <Image
                  alt={matchup.opponentChampion.name}
                  className="h-full w-full scale-110 bg-cover relative bg-center bg-no-repeat object-cover group-hover:scale-105 transition-all duration-500"
                  src={matchup.opponentChampion.splashUrl ?? ''}
                />
              </div>
              <div className="relative flex flex-col items-center gap-0.5 w-full max-w-[75px]">
                <span className="text-sm font-medium text-center truncate w-full">{matchup.opponentChampion.name}</span>
                <span className={winRateLabel({ type })}>
                  {(100 - matchup.weightedWinRate).toFixed(1)}
                  <span className="text-xs font-medium">%</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
