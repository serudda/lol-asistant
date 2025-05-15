export const AvatarSize = {
  xs: 'xs',
  sm: 'sm',
  base: 'base',
  lg: 'lg',
} as const;
export type AvatarSizeType = (typeof AvatarSize)[keyof typeof AvatarSize];
