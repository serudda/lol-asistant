import { Button, ButtonAppearance, ButtonSize, ButtonVariant } from './Button';
import { LoadingButton } from './LoadingButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
    appearance: {
      control: 'select',
      options: Object.values(ButtonAppearance),
    },
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Appearance: Story = {
  args: {
    children: 'Click me',
    size: ButtonSize.sm,
    appearance: ButtonAppearance.contained,
    onClick: () => alert('Button clicked'),
  },

  render: function Render(args) {
    return (
      <div className="flex gap-4">
        <Button {...args} appearance={ButtonAppearance.contained}>
          Contained
        </Button>
        <Button {...args} appearance={ButtonAppearance.outlined}>
          Outlined
        </Button>
        <Button {...args} appearance={ButtonAppearance.ghost}>
          Ghost
        </Button>
      </div>
    );
  },
};

export const Size: Story = {
  render: function Render(args) {
    return (
      <div className="flex gap-4">
        <Button {...args} size={ButtonSize.sm}>
          Small
        </Button>
        <Button {...args} size={ButtonSize.base}>
          Base
        </Button>
        <Button {...args} size={ButtonSize.lg}>
          Large button
        </Button>
      </div>
    );
  },
};

export const Variant: Story = {
  render: function Render(args) {
    return (
      <div className="flex gap-4">
        <Button {...args} variant={ButtonVariant.primary}>
          Primary
        </Button>
        <Button {...args} variant={ButtonVariant.neutral}>
          Neutral
        </Button>
      </div>
    );
  },
};
export const Loading: Story = {
  render: function Render() {
    return (
      <div className="flex gap-4">
        <LoadingButton isLoading={true} appearance={ButtonAppearance.contained} variant={ButtonVariant.primary}>
          Loading
        </LoadingButton>
        <LoadingButton isLoading={false} appearance={ButtonAppearance.contained} variant={ButtonVariant.primary}>
          Not Loading
        </LoadingButton>
      </div>
    );
  },
};

export const LoadingVariants: Story = {
  render: function Render() {
    return (
      <div className="flex gap-4">
        <LoadingButton isLoading={true} appearance={ButtonAppearance.contained} variant={ButtonVariant.primary}>
          Primary Loading
        </LoadingButton>
        <LoadingButton isLoading={true} appearance={ButtonAppearance.contained} variant={ButtonVariant.neutral}>
          Neutral Loading
        </LoadingButton>
      </div>
    );
  },
};
