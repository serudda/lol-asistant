export const TriggerSize = {
  base: 'base',
  lg: 'lg',
  xl: 'xl',
} as const;
export type TriggerSizeType = (typeof TriggerSize)[keyof typeof TriggerSize];
