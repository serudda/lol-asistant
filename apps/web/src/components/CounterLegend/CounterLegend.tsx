import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex items-center gap-4'],
});

export interface CounterLegendProps {
  /**
   * Additional class names.
   */
  className?: string;

  /**
   * The base champion name.
   */
  champion: string;
}

/**
 * Renders the official League of Legends rank tier icon.
 */
export const CounterLegend = ({ className, champion }: CounterLegendProps) => {
  const classes = container({ className });

  return (
    <div className={classes}>
      <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded bg-emerald-500/10" />
        <span className="text-xs text-gray-400 font-normal">Weak against {champion}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-4 rounded bg-red-500/10" />
        <span className="text-xs text-gray-400 font-normal">Strong against {champion}</span>
      </div>
    </div>
  );
};
