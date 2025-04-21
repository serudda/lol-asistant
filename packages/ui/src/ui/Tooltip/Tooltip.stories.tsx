import { Button, ButtonSize, ButtonVariant } from '../Button/Button';
import { Tooltip } from './Tooltip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Print UI Kit/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip.Provider>
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant={ButtonVariant.bull} size={ButtonSize.sm}>
            Hover me
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="px-2 py-1" align="center" side="right">
          <Tooltip.Arrow className="fill-neutral-900" />
          <span className="text-sm leading-none text-white">Tooltip content</span>
        </Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  ),
};
