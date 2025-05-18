import * as React from 'react';
import type { RankTier } from '../../utils/api';
import { ICON_PATHS } from './catalog';
// import { RankTier } from '@lol-assistant/db';
import { tv, type VariantProps } from 'tailwind-variants';

const svg = tv({
  base: ['transition-colors'],
});

export interface RankTierIconProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof svg> {
  /**
   * The rank tier to render.
   */
  rankTier: RankTier;

  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Renders the official League of Legends rank tier icon.
 */
export const RankTierIcon = ({ rankTier, className, ...svgProps }: RankTierIconProps) => {
  const classes = svg({ className });

  const iconNode = ICON_PATHS[rankTier];

  if (!iconNode) return null;

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${rankTier} icon`} className={classes} {...svgProps}>
      {iconNode}
    </svg>
  );
};

RankTierIcon.displayName = 'RankTierIcon';
