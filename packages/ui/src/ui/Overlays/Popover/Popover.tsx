import { Content } from './internals';
import { Anchor, Arrow, Root, Trigger, type PopoverProps } from '@radix-ui/react-popover';

/**
 * The Popover component displays floating informative and
 * actionable content in relation to a target. Popovers
 * appear either at the top, bottom, left, or right of their
 * target.
 *
 * @see https://www.uiguideline.com/components/popover
 */
export const Popover = (props: PopoverProps) => <Root {...props} />;
Popover.Arrow = Arrow;
Popover.Anchor = Anchor;
Popover.Trigger = Trigger;
Popover.Content = Content;

Popover.displayName = 'Popover';

export type { PopoverProps } from '@radix-ui/react-popover';
export type { ContentProps } from './internals';

/**
 * Reference:
 * https://www.radix-ui.com/primitives/docs/components/popover.
 */
