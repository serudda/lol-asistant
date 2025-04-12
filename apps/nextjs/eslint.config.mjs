import baseConfig, { restrictEnvAccess } from '@lol-assistant/eslint-config';
import nextjsConfig from '@lol-assistant/eslint-config/nextjs';
import reactConfig from '@lol-assistant/eslint-config/react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ['.next/**', './postcss.config.js'],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
  eslintPluginPrettierRecommended,
];
