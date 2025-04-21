export const SpinnerSize = {
  xs: 'xs',
  sm: 'sm',
  base: 'base',
  lg: 'lg',
} as const;
export type SpinnerSizeType = (typeof SpinnerSize)[keyof typeof SpinnerSize];

/* ------------------------------------------------------------ */

export const SpinnerVariant = {
  primary: 'primary',
  bull: 'bull',
  bear: 'bear',
} as const;
export type SpinnerVariantType = (typeof SpinnerVariant)[keyof typeof SpinnerVariant];

/* ------------------------------------------------------------ */
