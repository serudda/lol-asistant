import baseConfig from '@lol-assistant/eslint-config';

export default [
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
];
