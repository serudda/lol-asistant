import React, { useEffect, useState } from 'react';
import { ImageLoading, type ImageLoadingType } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const image = tv({
  base: ['transition-opacity duration-500 max-w-none'],
  variants: {
    hasMaxWidth: {
      true: 'max-w-full',
      false: 'max-w-none',
    },
    imageLoaded: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    hasMaxWidth: false,
    imageLoaded: false,
  },
});

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof image> {
  /**
   * URL of the image.
   */
  src?: string;

  /**
   * URL set of the image.
   */
  srcSet?: string;

  /**
   * Alt text of the image.
   */
  alt?: string;

  /**
   * Indicate whether the has a max width value or not.
   */
  hasMaxWidth?: boolean;

  /**
   * Pass a custom state if the image does not load
   * correctly.
   */
  noImg?: JSX.Element;

  /**
   * Specify optional styles to be added to the component.
   */
  style?: React.CSSProperties;

  /**
   * Specifies the loading behavior of the image. This
   * loading is the equivalent of the loading attribute of
   * the img tag.
   */
  loading?: ImageLoadingType;

  /**
   * Specify an optional className to be added to the
   * component.
   */
  className?: string;

  /**
   * URL of the fallback image to be displayed if the
   * primary image fails to load.
   */
  fallbackImage?: string;

  /**
   * Callback fired when the image load.
   */
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

/**
 * Image component is used to display images.
 *
 * @author Sergio
 *   Ruiz[sergioruizdavila@gmail.com](mailto:sergioruizdavila@gmail.com)
 *   Created at 2023-08-26.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      srcSet,
      alt,
      hasMaxWidth = false,
      noImg,
      style,
      loading = ImageLoading.eager,
      className,
      onLoad,
      fallbackImage,
      ...props
    },
    ref,
  ) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [hasAttemptedFallback, setHasAttemptedFallback] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isValidSrc, setIsValidSrc] = useState(Boolean(src));

    const classes = image({ hasMaxWidth, imageLoaded, className });

    useEffect(() => {
      setImageSrc(src);
      setHasAttemptedFallback(false);
      setImageLoaded(false);
    }, [src]);

    useEffect(() => {
      setIsValidSrc(Boolean(imageSrc));
    }, [imageSrc]);

    const handleError = (): void => {
      if (!hasAttemptedFallback && fallbackImage) {
        setImageSrc(fallbackImage);
        setHasAttemptedFallback(true);
      } else setIsValidSrc(false);
    };

    const handleLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
      setImageLoaded(true);
      if (onLoad) onLoad(event);
    };

    return (
      <>
        {isValidSrc ? (
          <img
            ref={ref}
            className={classes}
            style={style}
            src={imageSrc}
            srcSet={srcSet}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            loading={loading}
            {...props}
          />
        ) : (
          <>
            {noImg ? (
              noImg
            ) : (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <p className="text font-semi-bold text-xl text-slate-300">{alt}</p>
              </div>
            )}
          </>
        )}
      </>
    );
  },
);

Image.displayName = 'Image';

export { ImageLoading };
export type { ImageLoadingType };
