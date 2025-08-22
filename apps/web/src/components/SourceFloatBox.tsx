import {
  getChampionSlugForSource,
  normalizeStringToSlug,
  Sources,
  toMobalyticsRank,
  toOPGGRank,
  toUGGRank,
} from '@lol-assistant/common';
import type { LoLChampionRole, RankTier, Source } from '@lol-assistant/db';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex items-center gap-1', 'backdrop-blur-sm', 'bg-white/20', 'rounded-lg', 'p-1'],
});

export interface SourceFloatBoxProps {
  /**
   * Additional class names.
   */
  className?: string;

  /**
   * The champion slug.
   */
  championSlug: string;

  /**
   * The role of the champion.
   */
  role: LoLChampionRole;

  /**
   * The rank tier of the champion.
   */
  rankTier: RankTier;

  /**
   * The list of sources to display.
   */
  sources: Array<Source>;
}

/**
 * Component to display the list of champion websites (Mobalytics, OP.GG, U.GG)
 */
export const SourceFloatBox = ({ className, championSlug, role, rankTier, sources }: SourceFloatBoxProps) => {
  const classes = container({ className });

  const buildSourceUrl = (source: Source) => {
    switch (source.slug as Sources) {
      case Sources.MOBALYTICS: {
        const lowerCaseRole = role.toLowerCase();
        const mobalyticsRank = toMobalyticsRank(rankTier);
        const sourceChampionSlug = getChampionSlugForSource(normalizeStringToSlug(championSlug), Sources.MOBALYTICS);
        return `${source.baseUrl}lol/champions/${sourceChampionSlug}/build/${lowerCaseRole}?rank=${mobalyticsRank}`;
      }
      case Sources.OP_GG: {
        const lowerCaseRole = role.toLowerCase();
        const opggRank = toOPGGRank(rankTier);
        const sourceChampionSlug = getChampionSlugForSource(normalizeStringToSlug(championSlug), Sources.OP_GG);
        return `${source.baseUrl}lol/champions/${sourceChampionSlug}/build/${lowerCaseRole}?tier=${opggRank}`;
      }
      case Sources.U_GG: {
        const lowerCaseRole = role.toLowerCase();
        const uggRank = toUGGRank(rankTier);
        const sourceChampionSlug = getChampionSlugForSource(normalizeStringToSlug(championSlug), Sources.U_GG);
        return `${source.baseUrl}lol/champions/${sourceChampionSlug}/build/${lowerCaseRole}?rank=${uggRank}`;
      }
      default:
        return '';
    }
  };

  return (
    <div className={classes}>
      <div className="flex items-center gap-1">
        <a
          className="hover:bg-black/50 rounded-md p-1"
          href={buildSourceUrl(sources[0]!)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={sources[0]?.logoUrl} alt={sources[0]?.name} className="size-7 inline-block" />
        </a>
      </div>
      <div className="flex items-center gap-1">
        <a
          className="hover:bg-black/50 rounded-md p-1"
          href={buildSourceUrl(sources[1]!)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={sources[1]?.logoUrl} alt={sources[1]?.name} className="size-7 inline-block" />
        </a>
      </div>
      <div className="flex items-center gap-1">
        <a
          className="hover:bg-black/50 rounded-md p-1"
          href={buildSourceUrl(sources[2]!)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={sources[2]?.logoUrl} alt={sources[2]?.name} className="size-7 inline-block" />
        </a>
      </div>
    </div>
  );
};
