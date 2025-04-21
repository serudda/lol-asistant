import { Command } from './Command';
import type { Meta, StoryObj } from '@storybook/react';
import { tv } from 'tailwind-variants';

const meta = {
  title: 'UI Components/Command',
  component: Command,
  tags: ['autodocs'],
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

const commandStyles = tv({
  slots: {
    item: [
      'relative flex cursor-default gap-2 text-neutral-50',
      'select-none items-center rounded-sm py-3 px-4 text-sm outline-none',
      'data-[disabled=true]:pointer-events-none data-[selected=true]:bg-neutral-500 data-[selected=true]:text-neutral-50',
      'data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
    ],
    list: ['max-h-72 overflow-y-auto overflow-x-hidden bg-neutral-700'],
  },
});

export const Default: Story = {
  args: {},
  render: (args) => {
    const { item, list } = commandStyles();

    return (
      <Command {...args}>
        <Command.List className={list()}>
          <Command.Item className={item()}>Item 1</Command.Item>
          <Command.Item className={item()}>Item 2</Command.Item>
          <Command.Item className={item()}>Item 3</Command.Item>
        </Command.List>
      </Command>
    );
  },
};
