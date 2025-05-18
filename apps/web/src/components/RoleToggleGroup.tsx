// import { LoLChampionRole } from '@lol-assistant/db';

import { ToggleAppearance, ToggleGroup, ToggleSize, ToggleVariant } from '@lol-assistant/ui';
import { LoLChampionRole } from '../utils/api';
import { RoleIcon } from './RoleIcon/RoleIcon';

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
      variant={ToggleVariant.neutral}
      appearance={ToggleAppearance.outlined}
      size={ToggleSize.base}
      type="single"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      <ToggleGroup.Item
        key={LoLChampionRole.top}
        value={LoLChampionRole.top}
        aria-label="Top"
        className="rounded-l-md rounded-r-none -mr-px"
      >
        <RoleIcon role={LoLChampionRole.top} className="size-8" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        key={LoLChampionRole.jungle}
        value={LoLChampionRole.jungle}
        aria-label="Jungle"
        className="rounded-none -mr-px"
      >
        <RoleIcon role={LoLChampionRole.jungle} className="size-8" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        key={LoLChampionRole.mid}
        value={LoLChampionRole.mid}
        aria-label="Mid"
        className="rounded-none -mr-px"
      >
        <RoleIcon role={LoLChampionRole.mid} className="size-8" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        key={LoLChampionRole.adc}
        value={LoLChampionRole.adc}
        aria-label="ADC"
        className="rounded-none -mr-px"
      >
        <RoleIcon role={LoLChampionRole.adc} className="size-8" />
      </ToggleGroup.Item>
      <ToggleGroup.Item
        key={LoLChampionRole.support}
        value={LoLChampionRole.support}
        aria-label="Support"
        className="rounded-r-md rounded-l-none"
      >
        <RoleIcon role={LoLChampionRole.support} className="size-8" />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};
