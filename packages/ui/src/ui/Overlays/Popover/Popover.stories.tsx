import { Button, ButtonVariant } from '../../Button/Button';
import { Popover } from './Popover';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Components/Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
  args: {
    onOpenChange: () => console.log('open change'),
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex h-full w-full items-center justify-center">
      <Popover {...args}>
        <Popover.Trigger asChild>
          <Button variant={ButtonVariant.neutral}>Trigger</Button>
        </Popover.Trigger>

        <Popover.Content side="bottom">
          <div className="flex max-w-sm flex-col items-start gap-2 p-4">
            <div className="text-left text-lg">Title</div>
            <div className="mb-3 text-left text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </div>
          </div>
          <Popover.Arrow className="border-neutral-700" />
        </Popover.Content>
      </Popover>
    </div>
  ),
};
