import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex items-center gap-4'],
});

export interface CounterLegendProps {
  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Component to display the counter legend on the counter
 * list.
 */
export const CounterLegend = ({ className }: CounterLegendProps) => {
  const classes = container({ className });

  return (
    <div className={classes}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded bg-emerald-300/20" />
        <span className="text-xs text-gray-400 font-normal">Easy matchup</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded bg-red-400/30" />
        <span className="text-xs text-gray-400 font-normal">Hard matchup</span>
      </div>
    </div>
  );
};
