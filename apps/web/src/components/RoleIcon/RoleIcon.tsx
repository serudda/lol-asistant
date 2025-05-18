import * as React from 'react';
import { LoLChampionRole } from '@lol-assistant/db';
import { ICON_PATHS } from './catalog';
import { tv, type VariantProps } from 'tailwind-variants';

const svg = tv({
  base: ['transition-colors'],
});

export interface RoleIconProps extends React.SVGAttributes<SVGSVGElement>, VariantProps<typeof svg> {
  /**
   * The League role to render.
   */
  role: LoLChampionRole;

  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Renders the official League of Legends role icon.
 */
export const RoleIcon = ({ role, className, ...svgProps }: RoleIconProps) => {
  const classes = svg({ className });

  const iconNode = ICON_PATHS[role];

  if (!iconNode) return null;

  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={`${role} icon`} className={classes} {...svgProps}>
      {iconNode}
    </svg>
  );
};

RoleIcon.displayName = 'RoleIcon';
