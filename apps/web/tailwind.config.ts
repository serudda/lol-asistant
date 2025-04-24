import basePresets from '@lol-assistant/tailwind-config';
import type { Config } from 'tailwindcss';

export default {
  presets: [basePresets],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@lol-assistant/ui/src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
} satisfies Config;
