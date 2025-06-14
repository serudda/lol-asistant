import type { LoLChampionRole } from '@lol-assistant/db';
import { ToggleAppearance, ToggleGroup, ToggleSize, ToggleVariant } from '@lol-assistant/ui';
import { RoleIcon } from './RoleIcon/RoleIcon';
import { tv, type VariantProps } from 'tailwind-variants';

const toggleItem = tv({
  base: '',
  variants: {
    position: {
      single: 'rounded-md',
      first: 'rounded-l-md rounded-r-none -mr-px',
      middle: 'rounded-none -mr-px',
      last: 'rounded-r-md rounded-l-none',
    },
  },
});

interface RoleToggleGroupProps extends VariantProps<typeof toggleItem> {
  /**
   * The class name of the combobox.
   */
  className?: string;

  /**
   * The list of roles to display.
   */
  roles: Array<LoLChampionRole>;

  /**
   * The value of the champion.
   */
  defaultValue?: LoLChampionRole;

  /**
   * The function to call when the value changes.
   */
  onValueChange: (value: LoLChampionRole) => void;
}

/**
 * A toggle group for selecting a role.
 */
export const RoleToggleGroup = ({ defaultValue, onValueChange, className, roles = [] }: RoleToggleGroupProps) => {
  if (roles.length === 0) return null;

  const getItemPosition = (index: number, totalItems: number) => {
    if (totalItems === 1) return 'single';
    if (index === 0) return 'first';
    if (index === totalItems - 1) return 'last';
    return 'middle';
  };

  return (
    <ToggleGroup
      variant={ToggleVariant.neutral}
      appearance={ToggleAppearance.outlined}
      size={ToggleSize.lg}
      type="single"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      {roles.map((role, index) => (
        <ToggleGroup.Item
          key={role}
          value={role}
          aria-label={role}
          className={toggleItem({ position: getItemPosition(index, roles.length) })}
        >
          <RoleIcon role={role} className="size-6" />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
};
