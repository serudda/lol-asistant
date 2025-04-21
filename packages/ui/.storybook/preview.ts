import '../src/styles/global.css';

const preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'Components', '*'],
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
