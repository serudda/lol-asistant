import { Button, ButtonVariant } from '../../Button/Button';
import { Tooltip } from './Tooltip';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Components/Overlays/Tooltip',
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
          <Button variant={ButtonVariant.primary}>Hover me</Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="px-2 py-1" align="center" side="right">
          <div className="text-xs text-white">Tooltip content</div>
        </Tooltip.Content>
      </Tooltip>
    </Tooltip.Provider>
  ),
};
