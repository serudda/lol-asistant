import type { Champion } from '@lol-assistant/db';

/**
 * Represents the structure of a champion input for the
 * champion service.
 */
export type ChampionSaveInput = Pick<Champion, 'id' | 'thumbnailUrl' | 'splashUrl'>;
