export const LogoSize = {
  sm: 'sm',
  base: 'base',
  lg: 'lg',
} as const;
export type LogoSizeType = (typeof LogoSize)[keyof typeof LogoSize];

/* ------------------------------------------------------------ */

export const LogoAppearance = {
  symbol: 'symbol',
  wordmark: 'wordmark',
  complete: 'complete',
} as const;
export type LogoAppearanceType = (typeof LogoAppearance)[keyof typeof LogoAppearance];

/* ------------------------------------------------------------ */

export const LogoVariant = {
  light: 'light',
  dark: 'dark',
} as const;
export type LogoVariantType = (typeof LogoVariant)[keyof typeof LogoVariant];
