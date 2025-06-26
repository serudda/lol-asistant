export const ImageLoading = {
  eager: 'eager',
  lazy: 'lazy',
} as const;
export type ImageLoadingType = (typeof ImageLoading)[keyof typeof ImageLoading];
