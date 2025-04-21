import '../src/styles/global.css';

import type { Preview } from '@storybook/react';
import { themes } from '@storybook/theming';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'UI Components', '*'],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      theme: themes.dark,
    },

    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#090909',
        },
        {
          name: 'light',
          value: '#FFFFFF',
        },
      ],
    },
  },
};

export default preview;
