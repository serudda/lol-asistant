import { Avatar } from './Avatar';
import { AvatarSize } from './types';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Avatar> = {
  title: 'UI Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(AvatarSize),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Size: Story = {
  render: function Render(args) {
    return (
      <div className="flex gap-4">
        <Avatar {...args} size={AvatarSize.sm}>
          <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/15.8.1/img/spell/SummonerFlas.png" />
          <Avatar.Fallback>AT</Avatar.Fallback>
        </Avatar>
        <Avatar {...args} size={AvatarSize.base}>
          <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/15.8.1/img/item/100.png" />
          <Avatar.Fallback>AM</Avatar.Fallback>
        </Avatar>
        <Avatar {...args} size={AvatarSize.lg}>
          <Avatar.Image src="https://ddragon.leagueoflegends.com/cdn/15.8.1/img/spell/FashFrost.png" />
          <Avatar.Fallback>WA</Avatar.Fallback>
        </Avatar>
      </div>
    );
  },
};
