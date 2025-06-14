import type { Champion } from '@lol-assistant/db';

/**
 * Represents the structure of the stats object within
 * DDragon champion data.
 */
export interface DDragonChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number; // Note: API provides this as offset, but usually used as base
}

/**
 * Represents the structure of the image object within
 * DDragon data.
 */
export interface DDragonImage {
  full: string; // Filename
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Represents the structure of a champion spell from DDragon
 * data.
 */
export interface DDragonSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip?: { label: string[]; effect: string[] };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues?: Record<string, any>; // Often empty, structure varies
  effect: (number[] | null)[]; // Effect values per rank
  effectBurn: (string | null)[];
  vars?: { link: string; coeff: number | number[]; key: string }[];
  costType: string; // e.g., " Mana"
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: DDragonImage;
  resource?: string; // e.g., "{{ cost }} Mana"
}

/**
 * Represents the structure of a champion passive from
 * DDragon data.
 */
export interface DDragonPassive {
  name: string;
  description: string;
  image: DDragonImage;
}

/**
 * Represents the main structure for a single champion
 * returned by the DDragon API (specifically the data within
 * response.data[championId]).
 */
export interface DDragonChampionData {
  id: string; // Champion slug (e.g., "Aatrox")
  key: string; // Numerical key (e.g., "266")
  name: string;
  title: string;
  image: DDragonImage;
  skins: { id: string; num: number; name: string; chromas: boolean }[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[]; // Roles (e.g., ["Fighter", "Tank"])
  partype: string; // Resource type (e.g., "Blood Well")
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: DDragonChampionStats;
  spells: DDragonSpell[];
  passive: DDragonPassive;
  recommended?: any; // Structure varies, often unused
}

/**
 * Represents the structure of a champion input for the
 * champion service.
 */
export type ChampionSaveInput = Omit<
  Champion,
  'id' | 'isActive' | 'createdAt' | 'updatedAt' | 'spells' | 'mainRoles'
> & {
  // Note: spells is an array of objects, but the type is not defined in the Champion interface
  spells: Record<string, any>[];
};
