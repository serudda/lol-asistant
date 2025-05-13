import { Toggle } from './Toggle';
import type { Meta, StoryObj } from '@storybook/react';
import { Bold } from 'lucide-react';

const meta: Meta<typeof Toggle> = {
  title: 'UI Components/Buttons/Toggle',
  component: Toggle,
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: <Bold className="size-4" />,
    onPressedChange: (pressed) => console.log('Button clicked: ', pressed),
  },
  render: function Render(args) {
    return <Toggle {...args} />;
  },
};
