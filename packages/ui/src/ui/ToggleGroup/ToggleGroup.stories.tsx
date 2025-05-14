import { ToggleAppearance, ToggleSize, ToggleVariant } from '../Buttons';
import { ToggleGroup } from './ToggleGroup';
import type { Meta, StoryObj } from '@storybook/react';
import { Bold } from 'lucide-react';

const meta: Meta<typeof ToggleGroup> = {
  title: 'UI Components/ToggleGroup',
  component: ToggleGroup,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ToggleSize),
    },
    appearance: {
      control: 'select',
      options: Object.values(ToggleAppearance),
    },
    variant: {
      control: 'select',
      options: Object.values(ToggleVariant),
    },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    type: 'single',
    children: <Bold className="size-4" />,
    onValueChange: (value) => console.log('Value changed: ', value),
  },
  render: function Render(args) {
    return (
      <ToggleGroup {...args}>
        <ToggleGroup.Item value="1" aria-label="Item 1">
          Item 1
        </ToggleGroup.Item>
        <ToggleGroup.Item value="2" aria-label="Item 2">
          Item 2
        </ToggleGroup.Item>
        <ToggleGroup.Item value="3" aria-label="Item 3">
          Item 3
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};

export const SVG: Story = {
  args: {
    type: 'single',
    onValueChange: (value) => console.log('Value changed: ', value),
  },
  render: function Render(args) {
    return (
      <ToggleGroup {...args}>
        <ToggleGroup.Item value="1">
          <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-0.000526428 15.5454L-0.000522614 -4.19617e-05H15.5449L12.2722 3.27269H3.2722L3.2722 12.2727L-0.000526428 15.5454Z"
              fill="currentColor"
              fill-opacity="0.6"
            />
            <path
              d="M18 18H6.1086H2.45455L5.72728 14.7273H14.7273L14.7273 5.72727L18 2.45455L18 18Z"
              fill="currentColor"
            />
            <path
              d="M6.54599 11.4545H11.4551L11.4551 6.54538H6.54599L6.54599 11.4545Z"
              fill="currentColor"
              fill-opacity="0.6"
            />
          </svg>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="2">
          <svg className="fill-current" width="18" height="20" viewBox="0 0 18 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.32143 20L2.97321 13.4387C2.8125 10.751 1.84821 8.4585 0 6.56127C3.05357 8.53755 4.90179 10.2767 5.54464 11.8577C5.22321 6.95652 4.25893 3.00395 2.73214 0C7.15179 6.08696 9.40179 10.751 9.5625 13.913C9.72321 17.0751 9.64286 19.1304 9.32143 20ZM11.8125 16.8379C12.0536 11.8577 14.0625 8.06324 18 5.5336C16.0714 8.37945 15.2679 11.0672 15.4286 13.6759L11.8125 16.8379ZM10.7679 11.3834L9.72322 7.11462C10.8482 4.82213 12.6964 2.45059 15.1875 0.158103C13.4196 3.32016 12.375 5.8498 11.8929 7.66798C11.4911 9.56522 11.0893 10.751 10.7679 11.3834Z"
              fill="currentColor"
            />
          </svg>
        </ToggleGroup.Item>
        <ToggleGroup.Item value="3">
          <svg className="fill-current" width="22" height="18" viewBox="0 0 22 18" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.9611 17.9999L13.9929 15.3817L10.9611 7.36349L7.85156 15.3817L10.9611 17.9999Z"
              fill="currentColor"
            />
            <path
              d="M6.84099 10.6364L9.17314 6.1364L7.0742 4.09094H0L6.14134 6.95458L4.58657 8.50913L6.84099 10.6364Z"
              fill="currentColor"
            />
            <path
              d="M15.0806 10.6364L12.8262 6.1364L14.9251 4.09094H21.9993L15.858 6.95458L17.4127 8.50913L15.0806 10.6364Z"
              fill="currentColor"
            />
            <path
              d="M10.883 4.90909L13.9925 1.63636L12.4377 0H9.32821L7.77344 1.55455L10.883 4.90909Z"
              fill="currentColor"
            />
          </svg>
        </ToggleGroup.Item>
      </ToggleGroup>
    );
  },
};
