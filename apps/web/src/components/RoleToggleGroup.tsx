import { LoLChampionRole } from '@lol-assistant/db';
import { ToggleAppearance, ToggleGroup, ToggleSize, ToggleVariant } from '@lol-assistant/ui';
import { roleOptions } from '../constants';

interface RoleToggleGroupProps {
  /**
   * The class name of the combobox.
   */
  className?: string;

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
export const RoleToggleGroup = ({ defaultValue, onValueChange, className }: RoleToggleGroupProps) => {
  return (
    <ToggleGroup
      variant={ToggleVariant.primary}
      appearance={ToggleAppearance.outlined}
      size={ToggleSize.sm}
      type="single"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      {roleOptions.map((role) => (
        <ToggleGroup.Item key={role.value} value={role.value} aria-label={role.label}>
          <img src={role.imageUrl} alt={role.label} className="w-4 h-4" />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup>
  );
};
