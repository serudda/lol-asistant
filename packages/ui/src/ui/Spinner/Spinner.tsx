import { SpinnerSize, SpinnerVariant } from './types';
import type { SpinnerSizeType, SpinnerVariantType } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const spinner = tv({
  base: ['flex items-center justify-center'],
  variants: {
    isFullScreen: {
      true: 'size-full',
    },
  },
  defaultVariants: {
    isFullScreen: false,
  },
});

const svg = tv({
  base: ['ease-linear', 'animate-spin'],
  variants: {
    size: {
      [SpinnerSize.xs]: 'size-2',
      [SpinnerSize.sm]: 'size-4',
      [SpinnerSize.base]: 'size-8',
      [SpinnerSize.lg]: 'size-12',
    },
    variant: {
      primary: 'fill-primary',
      bull: 'fill-bull-500',
      bear: 'fill-bear-500',
    },
  },
  defaultVariants: {
    size: SpinnerSize.base,
    variant: SpinnerVariant.primary,
  },
});

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof spinner> {
  /**
   * Class names used for external styles.
   */
  className?: string;

  /**
   * Set full width and full height.
   */
  isFullScreen?: boolean;

  /**
   * Changes the size of the Spinner.
   */
  size?: SpinnerSizeType;

  /**
   * External styles of wrapper spinner.
   */
  style?: React.CSSProperties;

  /**
   * The variant of the component. It supports those theme
   * colors that makes sense for this component.
   */
  variant?: SpinnerVariantType;
}

/**
 * A Spinner is an outline of a circle which animates around
 * itself indicating to the user that things are processing.
 * Use a Spinner when the content to be loaded is unknown or
 * unpredictable.
 *
 * @see https://www.uiguideline.com/components/spinner
 */
export const Spinner = ({
  className,
  isFullScreen = false,
  size = SpinnerSize.lg,
  style = {},
  variant = SpinnerVariant.primary,
}: SpinnerProps) => {
  const classes = {
    spinner: spinner({ isFullScreen, className }),
    svg: svg({ size, variant }),
  };

  return (
    <div aria-label="spinner" role="status" style={style} className={classes.spinner}>
      <svg viewBox="0 0 96 96" className={classes.svg} fill="currentColor">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M48 12C27.9825 12 12 27.9825 12 48C12 68.0175 27.9825 84 48 84C68.0175 84 84 68.0175 84 48C84 27.9825 68.0175 12 48 12ZM0 48C0 21.4903 21.4903 0 48 0C74.5097 0 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48Z"
          className="fill-neutral-500"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M90 48C86.6863 48 84.0524 45.2935 83.5065 42.0251C80.985 26.9298 69.0702 15.015 53.9749 12.4935C50.7065 11.9476 48 9.31371 48 6C48 2.68629 50.6997 -0.039338 53.9881 0.369878C75.71 3.07305 92.927 20.29 95.6301 42.0119C96.0393 45.3003 93.3137 48 90 48Z"
        />
      </svg>
    </div>
  );
};
Spinner.displayName = 'Spinner';

export { SpinnerSize, SpinnerVariant };
export type { SpinnerSizeType, SpinnerVariantType };
