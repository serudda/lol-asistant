import { Content } from './internals';
import { Arrow, Provider, Root, Trigger, type TooltipProps as RadixTooltipProps } from '@radix-ui/react-tooltip';

export type TooltipProps = RadixTooltipProps;

/**
 * A tooltip is a floating, non-actionable label used to
 * explain a user interface element or feature.
 *
 * @see https://www.uiguideline.com/components/tooltip
 */
export const Tooltip = ({ ...props }: TooltipProps) => <Root {...props} />;

Tooltip.Arrow = Arrow;
Tooltip.Content = Content;
Tooltip.Provider = Provider;
Tooltip.Trigger = Trigger;

Tooltip.displayName = 'Tooltip';

/**
 * Reference:
 * https://www.radix-ui.com/primitives/docs/components/tooltip.
 */
