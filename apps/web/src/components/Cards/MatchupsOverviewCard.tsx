import { Avatar, AvatarSize } from '@lol-assistant/ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['w-full flex flex-col gap-2'],
});

const card = tv({
  base: ['flex items-center gap-1 w-full ring-1 ring-gray-800 bg-gray-900 rounded-lg p-6'],
});

export interface MatchupsOverviewCardProps {
  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * A card to display a linear heatmap of matchups.
 */
export const MatchupsOverviewCard = ({ className }: MatchupsOverviewCardProps) => {
  const classes = {
    container: container({ className }),
    card: card({ className }),
  };

  return (
    <div className={classes.container}>
      <div className="flex items-center gap-3">
        <span className="text-xl font-medium">Strong against</span>
        <span className="text-gray-500 text-base">(Easiest matchups)</span>
      </div>
      <div className={classes.card}>
        <div className="flex flex-col items-center w-full gap-4">
          {/* Champion info */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size={AvatarSize.lg}>
              <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Volibear.png" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Volibear</span>
              <span className="text-sm text-center text-gray-400">62%</span>
            </div>
          </div>
          {/* Heatmap line */}
          <div className="w-full h-2 bg-red-500" />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          {/* Champion info */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size={AvatarSize.lg}>
              <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Volibear.png" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Volibear</span>
              <span className="text-sm text-center text-gray-400">62%</span>
            </div>
          </div>
          {/* Heatmap line */}
          <div className="w-full h-2 bg-red-500" />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          {/* Champion info */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size={AvatarSize.lg}>
              <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Volibear.png" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Volibear</span>
              <span className="text-sm text-center text-gray-400">62%</span>
            </div>
          </div>
          {/* Heatmap line */}
          <div className="w-full h-2 bg-red-400" />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          {/* Champion info */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size={AvatarSize.lg}>
              <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Volibear.png" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Volibear</span>
              <span className="text-sm text-center text-gray-400">62%</span>
            </div>
          </div>
          {/* Heatmap line */}
          <div className="w-full h-2 bg-red-400" />
        </div>

        <div className="flex flex-col items-center w-full gap-4">
          {/* Champion info */}
          <div className="flex flex-col items-center gap-2">
            <Avatar size={AvatarSize.lg}>
              <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/Volibear.png" />
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Volibear</span>
              <span className="text-sm text-center text-gray-400">62%</span>
            </div>
          </div>
          {/* Heatmap line */}
          <div className="w-full h-2 bg-red-300" />
        </div>
      </div>
    </div>
  );
};
