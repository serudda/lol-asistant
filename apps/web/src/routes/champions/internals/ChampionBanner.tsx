import { type BasicChampion } from '@lol-assistant/api';
import type { LoLChampionRole } from '@lol-assistant/db';
import { RankTier, type Source } from '@lol-assistant/db';
import { Image } from '@lol-assistant/ui';
import { SourceFloatBox } from '../../../components';
import { ChampionBannerSkeleton } from './Skeleton';

export const ChampionBanner = ({ champion, sources }: { champion?: BasicChampion; sources: Source[] }) => {
  if (!champion) return <ChampionBannerSkeleton />;

  return (
    <div className="relative w-full h-52 lg:h-64 rounded-xl overflow-hidden">
      {/* Splash Background */}
      <div className="absolute inset-0">
        <Image
          src={champion.splashUrl ?? ''}
          alt={`${champion.name} splash`}
          className="w-full h-full object-cover object-[0rem_-0.5rem] lg:object-[0rem_-3rem]"
          hasMaxWidth={false}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Champion Info */}
      <div className="relative z-10 flex items-center h-full px-8">
        <div className="flex flex-col text-white">
          <h1 className="text-5xl font-bold mb-2 drop-shadow-lg">{champion.name}</h1>
          <div className="flex items-center gap-2">
            {champion.mainRoles?.map((championRole, index) => (
              <span
                key={championRole}
                className="px-3 py-1 bg-blue-600/80 rounded-full text-sm font-medium capitalize backdrop-blur-sm"
              >
                {championRole.toLowerCase()}
                {index < (champion.mainRoles?.length ?? 0) - 1 && ''}
              </span>
            ))}
          </div>
        </div>

        <SourceFloatBox
          className="absolute right-2 top-2"
          championSlug={champion.slug}
          role={champion.mainRoles?.[0] as LoLChampionRole}
          rankTier={RankTier.silver}
          sources={sources}
        />
      </div>
    </div>
  );
};
