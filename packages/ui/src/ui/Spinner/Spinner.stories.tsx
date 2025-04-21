import { Spinner, SpinnerSize, SpinnerVariant } from './Spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      table: {
        type: {
          summary: Object.values(SpinnerVariant).join(', '),
        },
      },
      control: 'select',
      options: Object.values(SpinnerVariant),
      mapping: ['primary', 'bull', 'bear'],
    },
    size: {
      table: {
        type: {
          summary: Object.values(SpinnerSize).join(', '),
        },
      },
      control: 'select',
      options: Object.values(SpinnerSize),
    },
  },
  args: {
    size: SpinnerSize.base,
    variant: SpinnerVariant.primary,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: SpinnerVariant.primary,
    size: SpinnerSize.base,
  },
  render: (args) => <Spinner {...args} />,
};

export const ExtraSmall: Story = {
  args: {
    variant: SpinnerVariant.primary,
    size: SpinnerSize.xs,
  },
  render: (args) => <Spinner {...args} />,
};

export const Small: Story = {
  args: {
    variant: SpinnerVariant.primary,
    size: SpinnerSize.sm,
  },
  render: (args) => <Spinner {...args} />,
};

export const Large: Story = {
  args: {
    variant: SpinnerVariant.primary,
    size: SpinnerSize.lg,
  },
  render: (args) => <Spinner {...args} />,
};
