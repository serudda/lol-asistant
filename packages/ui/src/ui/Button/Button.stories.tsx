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

export const Default: Story = {
  args: {
    children: 'Click me',
    size: ButtonSize.sm,
    appearance: ButtonAppearance.contained,
    onClick: () => alert('Button clicked'),
  },

  render: function Render(args) {
    return <Button {...args} />;
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
        <LoadingButton isLoading={true} appearance={ButtonAppearance.contained} variant={ButtonVariant.bull}>
          Bull Loading
        </LoadingButton>
        <LoadingButton isLoading={true} appearance={ButtonAppearance.contained} variant={ButtonVariant.bear}>
          Bear Loading
        </LoadingButton>
        <LoadingButton isLoading={true} appearance={ButtonAppearance.outlined} variant={ButtonVariant.primary}>
          Outlined Loading
        </LoadingButton>
      </div>
    );
  },
};
