export const ButtonSize = {
  sm: 'sm',
  base: 'base',
  lg: 'lg',
  xl: 'xl',
} as const;
export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

/* ------------------------------------------------------------ */

export const ButtonAppearance = {
  contained: 'contained',
  outlined: 'outlined',
  ghost: 'ghost',
} as const;
export type ButtonAppearanceType = (typeof ButtonAppearance)[keyof typeof ButtonAppearance];

/* ------------------------------------------------------------ */

export const ButtonVariant = {
  primary: 'primary',
  bull: 'bull',
  bear: 'bear',
  neutral: 'neutral',
} as const;
export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];
