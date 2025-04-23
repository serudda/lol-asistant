import { Fallback, Image } from './internal';
import { AvatarSize, type AvatarSizeType } from './types';
import type { AvatarProps as RadixAvatarProps } from '@radix-ui/react-avatar';
import { Root } from '@radix-ui/react-avatar';
import { tv, type VariantProps } from 'tailwind-variants';

const root = tv({
  base: ['relative flex shrink-0 overflow-hidden rounded-full'],
  variants: {
    size: {
      [AvatarSize.sm]: ['h-6 w-6 text-xs'],
      [AvatarSize.base]: ['h-8 w-8 text-sm'],
      [AvatarSize.lg]: ['h-10 w-10 text-lg'],
    },
  },
});

export interface AvatarProps extends RadixAvatarProps, VariantProps<typeof root> {
  /**
   * The class name of the avatar root element.
   */
  size?: AvatarSizeType;
}

/**
 * Avatars are used to show a thumbnail representation of an
 * individual or business in the interface.
 *
 * @see https://www.uiguideline.com/components/avatar
 */
export const Avatar = ({ size = AvatarSize.base, ...props }: AvatarProps) => {
  const classes = root({ size });
  return <Root {...props} className={classes} />;
};

Avatar.Image = Image;
Avatar.Fallback = Fallback;

Avatar.displayName = Root.displayName;

/**
 * Reference:
 * https://www.radix-ui.com/primitives/docs/components/avatar.
 */
