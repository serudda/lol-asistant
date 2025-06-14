import { Sources, SourceUrls } from '../../common';

export const buildChampionImage = (
  patchVersion: string,
  ddragonChampionSlug: string,
): {
  splashUrl: string;
  thumbnailUrl: string;
} => {
  return {
    // Construct full image URL
    splashUrl: `${SourceUrls[Sources.COMMUNITY_DRAGON]}/${patchVersion}/champion/${ddragonChampionSlug}/splash-art/centered/skin/0`,
    // Construct thumbnail image URL
    thumbnailUrl: `${SourceUrls[Sources.DATA_DRAGON]}/cdn/${patchVersion}/img/champion/${ddragonChampionSlug}.png`,
  };
};
