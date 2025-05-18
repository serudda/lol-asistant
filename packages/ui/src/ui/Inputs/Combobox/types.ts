export const TriggerSize = {
  base: 'base',
  lg: 'lg',
} as const;
export type TriggerSizeType = (typeof TriggerSize)[keyof typeof TriggerSize];
