export const ToggleSize = {
  sm: 'sm',
  base: 'base',
  lg: 'lg',
} as const;
export type ToggleSizeType = (typeof ToggleSize)[keyof typeof ToggleSize];

/* ------------------------------------------------------------ */

export const ToggleAppearance = {
  outlined: 'outlined',
  ghost: 'ghost',
} as const;
export type ToggleAppearanceType = (typeof ToggleAppearance)[keyof typeof ToggleAppearance];

/* ------------------------------------------------------------ */

export const ToggleVariant = {
  primary: 'primary',
  neutral: 'neutral',
} as const;
export type ToggleVariantType = (typeof ToggleVariant)[keyof typeof ToggleVariant];
